from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_caching import Cache
import os, sys
import requests
from os import environ
from invokes import invoke_http
from datetime import datetime
sys.path.append("../")
import amqp_setup
import pika
import json
config = {
    "DEBUG": True,
    "CACHE_TYPE": "RedisCache",
    "CACHE_DEFAULT_TIMEOUT": 300,
    "CACHE_REDIS_URL": environ.get("redisURL") or "redis://localhost:6379/0"
}
app = Flask(__name__)
cache = Cache(app, config = config)
CORS(app)

itinerary_URL = environ.get("itineraryURL") or "http://localhost:5000/"
hg_URL = environ.get("hgURL") or "http://localhost:5001/hiddengem"
STB_API_key = "i9IigYi6bl70KMqOcpewpzHHQ2NanEqx"
DATASET = "accommodation,attractions,food_beverages,shops,venue,walking_trail"
stb_base_URL = "https://tih-api.stb.gov.sg/content/v1/"
CATEGORY = {
    "Attractions": "attractions",
    "Malls & Shops": "shops",
    "Venues": "venue",
    "Food & Beverages": "food_beverages",
    "Accommodation": "accommodation",
    "All": "all",
    "Walking Trail": "walking_trail",
    "Events": "event",
    "food_beverages": "food-beverages",
    "walking_trail": "walking-trail"
}

@app.route("/search/<string:keyword>")
@app.route("/search//")
def searchEventsByKeyword(keyword = ""):
    try:
        userID = request.args.get("userID")
        if userID == None:
            return jsonify({
                "code": 400,
                "data": "UserID not found"
            }), 400
    except:
        return jsonify({
            "code": 400,
            "data": "UserID not found"
        }), 400
    #call function to get info from Hidden Gem
    hgFound, hgData = get_HG_by_keyword(keyword)

    #call function to get info from STB API
    stbFound, stbData = get_STB_by_keyword(keyword)
    succ = "success"
    if not hgFound and not stbFound:
        result = {
            "code":404,
            "hgData": hgData,
            "stbData": stbData
        }
        code = 404 
        succ = "error"

    result = {
        "code":200,
        "hgData": hgData,
        "stbData": stbData
    }
    code = 200

    logging(userID, "searchKeyword", result, succ)
    return jsonify(result), code

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
        return False, event_result["data"]

@app.route("/search/<string:locType>/<string:poiUUID>", strict_slashes=False)
@app.route("/search/<string:locType>/<string:poiUUID>/", strict_slashes = False)
@app.route("/search/<string:locType>/<string:poiUUID>/<string:locCategory>")
# @cache.cached(timeout=43200)
def searchSpecificEvent(locType, poiUUID, locCategory = None):
    try:
        userID = request.args.get("userID")
        if userID == None:
            return jsonify({
                "code": 400,
                "data": "UserID not found"
            }), 400
    except:
        return jsonify({
            "code": 400,
            "data": "UserID not found"
        }),400
    rv = cache.get(poiUUID)
    if rv == None:
        if locType == "TA":
            #call STB API for data
            try:
                locCategory = CATEGORY[locCategory]
            except:
                pass
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
                    "locCategory": data["type"]
                }

                try:
                    result["reviews"] = data["reviews"]
                except:
                    pass
                
                try:
                    result["rating"] = data["rating"]
                except:
                    result['rating'] = 0
                
                try:
                    result["latitude"] = data["location"]["latitude"]
                except:
                    result['latitude'] = 0
                
                try:
                    result["longitude"] = data["location"]["longitude"]
                except:
                    result['longitude'] = 0
                
                try:
                    result["postalCode"] = data["address"]["postalCode"]
                except:
                    result['postalCode'] = ''


                if(len(data["images"]) != 0 or data["images"][0]["uuid"] != ""):
                    result["imageUrl"] = data["images"][0]["uuid"]
                else:
                    result["imageUrl"] = ""

                try: 
                    if len(data['businessHour']) != 0:
                        openTime = datetime.strptime(data["businessHour"][0]["openTime"], "%H:%M").strftime("%I:%M %p")

                        closeTime = datetime.strptime(data["businessHour"][0]["closeTime"], "%H:%M").strftime("%I:%M %p")

                        result["openTime"] = openTime
                        result["closeTime"] = closeTime
                    else:
                        result["openTime"] = "??"
                        result["closeTime"] = "??"
                except:
                    result["openTime"] = "??"
                    result["closeTime"] = "??"
                
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
                
                result = {
                    "code": code,
                    "data": result
                }
            else:
                #if error
                try:
                    result = event_result["status"]
                    return jsonify(result), code
                except:
                    result = jsonify({
                        "code": "500",
                        "data": event_result["message"]
                    })
                    return result, 500
        elif locType == "HG":
            #call Hidden Gem Service
            url = hg_URL + "/one/"+poiUUID
            result = invoke_http(url)
            code = result["code"]
            if code not in range(200,300):
                return jsonify(result), code
        else:
            result = {
                "code": 404,
                "locType": locType,
                "data": "Undefined locType."
            }
            code = 404

        cache.set(poiUUID, (jsonify(result),code), timeout = 43200)
        if userID != '0':
            logging(userID,"searchUUID", result, "success" if code in range (200,300) else "error")
        return result, code
    
    if userID != '0':
        try:
            # print(rv[0]["data"])
            logging(userID, "searchUUID", rv[0]["data"], "success")
        except:
            # print(rv)
            # print(rv[0])
            logging(userID, "searchUUID", rv[0].get_json()["data"], "success")
    return rv

@app.route("/poi/create", methods= ["POST"])
def create_hidden_gem():
    try:
        userID = request.args.get("userID")
        if userID == None:
            return jsonify({
                "code": 400,
                "data": "UserID not found"
            }), 400
    except:
        return jsonify({
            "code": 400,
            "data": "UserID not found"
        }), 400
    if request.is_json:
        try:
            hidden_gem = request.get_json()
            
            creation_result = invoke_http(hg_URL,method='POST', json = hidden_gem)
            
            logging(userID, "createHG", creation_result["data"], "success" if creation_result["code"] in range (200,300) else "error")
            return jsonify(creation_result), creation_result["code"]
        except Exception as e:
            pass  # do nothing.
    
    result = {
        "code": 400,
        "data": "Invalid JSON input: " + str(request.get_data())
    }
    logging(userID, "createHG", result, "error")
    # if reached here, not a JSON request.
    return jsonify({result}), 400


def logging(userID, action, logDetails, succ):
    try:
        message = {
            "userID": userID,
            "action": action,
            "logDetails": json.dumps(logDetails)
        }
    except:
        message = {
            "userID": userID,
            "action": action,
            "logDetails": json.dumps(logDetails.get_json()["data"])
        }
    amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key=succ+".log", body=json.dumps(message))


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
