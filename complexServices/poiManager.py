from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_caching import Cache
import os, sys

import requests
from invokes import invoke_http
from datetime import datetime

# import amqp_setup
import pika
import json
config = {
    "DEBUG": True,
    "CACHE_TYPE": "RedisCache",
    "CACHE_DEFAULT_TIMEOUT": 300,
    "CACHE_REDIS_URL": "redis://localhost:6379/0"
}
app = Flask(__name__)
cache = Cache(app, config = config)
CORS(app)

itinerary_URL = "http://localhost:5000/"
hg_URL = "http://localhost:5001/hiddengem"
STB_API_key = "i9IigYi6bl70KMqOcpewpzHHQ2NanEqx"
DATASET = "accommodation,attractions,food_beverages,shops,venue,walking_trail"
stb_base_URL = "https://tih-api.stb.gov.sg/content/v1/"
CATEGORY = {
    "Attractions": "attractions",
    "Malls & Shops": "shops",
    "Venues": "venue",
    "Food & Beverages": "food-beverages",
    "Accommodation": "accommodation",
    "All": "all",
    "Walking Trail": "walking_trail",
    "Events": "event"
}

@app.route("/search/<string:keyword>")
@app.route("/search//")
def searchEventsByKeyword(keyword = ""):
    #call function to get info from Hidden Gem
    hgFound, hgData = get_HG_by_keyword(keyword)

    #call function to get info from STB API
    stbFound, stbData = get_STB_by_keyword(keyword)

    if not hgFound and not stbFound:        
        return jsonify({
            "code": 404,
            "hgData": hgData,
            "stbData": stbData
        }), 404

    return jsonify({
        "code": 200,
        "hgData": hgData,
        "stbData": stbData
    })

def get_STB_by_keyword(keyword):
    
    url = stb_base_URL+"/search/all?dataset="+DATASET+"&apikey="+STB_API_key
    if keyword != "":
        url+= "&keyword="+keyword

    event_result = invoke_http(url)
    code = event_result["status"]["code"]

    if code in range(200,300):
        #cleanup data and return
        dataList = event_result["data"]["results"]
        results = []
        unique = []
        for data in dataList:
            if (len(data["images"]) != 0 and data["images"][0]["uuid"]!= "" and data["name"] not in unique):
                #add event name to unique to prevent duplicates
                unique.append(data["name"])

                #temp dict to store only relevant data
                temp = {
                    "name": data["name"],
                    "imageUrl": data["images"][0]["uuid"],
                    "poiUUID": data["uuid"],
                    "locCategory": CATEGORY[data["categoryDescription"]],
                    "description": data["description"]
                }
                #add temp to results
                results.append(temp)

        if results == []:
            return False, "No events from STB found."

        return True, results
    else:
        #handle error here
        return False, event_result["status"]

def get_HG_by_keyword(keyword):
    url = hg_URL + "/all/"+keyword

    event_result = invoke_http(url)
    code = event_result["code"]

    if code in range(200,300):
        #cleanup data and return
        results = []
        dataList = event_result["data"]
        for data in dataList:
            temp = {
                "name": data["name"],
                "imageUrl": data["imageUrl"],
                "poiUUID": data["poiUUID"],
                "locCategory": data["locCategory"],
                "description": data["description"]
            }
            #add temp to results
            results.append(temp)
        return True, results
    else:
        #handle error here
        return False, event_result["message"]

@app.route("/search/<string:locType>/<string:poiUUID>/")
@app.route("/search/<string:locType>/<string:poiUUID>/<string:locCategory>")
# @cache.cached(timeout=43200)
def searchSpecificEvent(locType, poiUUID, locCategory = None):
    rv = cache.get(poiUUID)
    
    if rv == None:
        if locType == "TA":
            #call STB API for data
            url = stb_base_URL+locCategory+"?apikey="+ STB_API_key +"&uuid="+poiUUID
            event_result = invoke_http(url)
            try:
                code = event_result['status']['code']
            except:
                code = event_result["code"]

            if code in range(200,300):
                #data clean up and return only useful info
                data = event_result["data"][0]
                
                result = {
                    "name": data["name"],
                    "poiUUID": poiUUID,
                    "description": data["body"],
                    "reviews": data["reviews"],
                    "rating": data["rating"],
                    "latitude": data["location"]["latitude"],
                    "longitude": data["location"]["longitude"],
                    "postalCode": data["address"]["postalCode"],
                    "locCategory": data["type"]
                }

                if(len(data["images"]) != 0 or data["images"][0]["uuid"] != ""):
                    result["imageUrl"] = data["images"][0]["uuid"]
                else:
                    result["imageUrl"] = ""

                try: 
                    if len(data['businessHour']) != 0:
                        startTime = datetime.strptime(data["businessHour"][0]["openTime"], "%H:%M").strftime("%I:%M %p")

                        endTime = datetime.strptime(data["businessHour"][0]["closeTime"], "%H:%M").strftime("%I:%M %p")

                        result["startTime"] = startTime
                        result["endTime"] = endTime
                    else:
                        result["startTime"] = "??"
                        result["endTime"] = "??"
                except:
                    result["startTime"] = "??"
                    result["endTime"] = "??"
                
                if data["officialEmail"] == "":
                    result["businessEmail"] = "-"
                else:
                    result["businessEmail"] = data["officialEmail"]

                if data["officialWebsite"] == "":
                    result["businessWeb"] = "-"
                else:
                    result["businessWeb"] = data["officialWebsite"]
                
                if data["contact"]["primaryContactNo"] == "":
                    result['businessContact'] = "-"
                else:
                    result["businessContact"] = data["contact"]["primaryContactNo"]
                
                result = jsonify({
                    "code": code,
                    "data": result
                })
            else:
                #if error
                try:
                    result = event_result["status"]
                except:
                    result = jsonify({
                        "code": "500",
                        "data": event_result["message"]
                    })
        elif locType == "HG":
            #call Hidden Gem Service
            url = hg_URL + "/one/"+poiUUID
            result = invoke_http(url)
            code = result["code"]
        else:
            result = jsonify({
                "code": 404,
                "locType": locType,
                "data": "Undefined locType."
            })
            code = 404

        cache.set(poiUUID, (result,code), timeout = 43200)
        return result, code
    
    return rv

@app.route("/poi/create", methods= ["POST"])
def create_hidden_gem():
    if request.is_json:
        try:
            hidden_gem = request.get_json()
            # print("\nReceived an hidden_gem in JSON:", hidden_gem)
            creation_result = invoke_http(hg_URL,method='POST', json = hidden_gem)
            # print('creation_result:', creation_result)
            return jsonify(creation_result), creation_result["code"]
        except Exception as e:
            pass  # do nothing.

    # if reached here, not a JSON request.
    return jsonify({
        "code": 400,
        "message": "Invalid JSON input: " + str(request.get_data())
    }), 400


# Execute this program if it is run as a main script (not by 'import')
if __name__ == "__main__":
    print("This is flask " + os.path.basename(__file__) + " for placing an order...")
    app.run(host="0.0.0.0", port=5100, debug=True)
    # Notes for the parameters: 
    # - debug=True will reload the program automatically if a change is detected;
    #   -- it in fact starts two instances of the same flask program, and uses one of the instances to monitor the program changes;
    # - host="0.0.0.0" allows the flask program to accept requests sent from any IP/host (in addition to localhost),
    #   -- i.e., it gives permissions to hosts with any IP to access the flask program,
    #   -- as long as the hosts can already reach the machine running the flask program along the network;
    #   -- it doesn't mean to use http://0.0.0.0 to access the flask program.
