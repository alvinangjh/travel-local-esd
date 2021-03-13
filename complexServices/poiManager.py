from flask import Flask, request, jsonify
from flask_cors import CORS

import os, sys

import requests
from invokes import invoke_http

# import amqp_setup
import pika
import json

app = Flask(__name__)
CORS(app)

itinerary_URL = "http://localhost:5000/"
hg_URL = "http://localhost:5001/hiddengem/"
STB_API_key = "i9IigYi6bl70KMqOcpewpzHHQ2NanEqx"
DATASET = "accommodation,attractions,event,food_beverages,shops,venue,walking_trail"
stb_base_URL = "https://tih-api.stb.gov.sg/content/v1/search/all?dataset="+DATASET+"&apikey="+STB_API_key

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
def searchEventsByKeyword(keyword):
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

    url = stb_base_URL+"&keyword="+keyword

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
    url = hg_URL + "all/"+keyword

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


def processPlaceOrder(order):
    # 2. Send the order info {cart items}
    # Invoke the order microservice
    print('\n-----Invoking order microservice-----')
    order_result = invoke_http(order_URL, method='POST', json=order)
    print('order_result:', order_result)
  

    # Check the order result; if a failure, send it to the error microservice.
    code = order_result["code"]
    message = json.dumps(order_result)

    if code not in range(200, 300):
        # Inform the error microservice
        #print('\n\n-----Invoking error microservice as order fails-----')
        print('\n\n-----Publishing the (order error) message with routing_key=order.error-----')

        # invoke_http(error_URL, method="POST", json=order_result)
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="order.error", 
            body=message, properties=pika.BasicProperties(delivery_mode = 2)) 
        # make message persistent within the matching queues until it is received by some receiver 
        # (the matching queues have to exist and be durable and bound to the exchange)

        # - reply from the invocation is not used;
        # continue even if this invocation fails        
        print("\nOrder status ({:d}) published to the RabbitMQ Exchange:".format(
            code), order_result)

        # 7. Return error
        return {
            "code": 500,
            "data": {"order_result": order_result},
            "message": "Order creation failure sent for error handling."
        }

    # Notice that we are publishing to "Activity Log" only when there is no error in order creation.
    # In http version, we first invoked "Activity Log" and then checked for error.
    # Since the "Activity Log" binds to the queue using '#' => any routing_key would be matched 
    # and a message sent to “Error” queue can be received by “Activity Log” too.

    else:
        # 4. Record new order
        # record the activity log anyway
        #print('\n\n-----Invoking activity_log microservice-----')
        print('\n\n-----Publishing the (order info) message with routing_key=order.info-----')        

        # invoke_http(activity_log_URL, method="POST", json=order_result)            
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="order.info", 
            body=message)
    
    print("\nOrder published to RabbitMQ Exchange.\n")
    # - reply from the invocation is not used;
    # continue even if this invocation fails
    
    # 5. Send new order to shipping
    # Invoke the shipping record microservice
    print('\n\n-----Invoking shipping_record microservice-----')    
    
    shipping_result = invoke_http(
        shipping_record_URL, method="POST", json=order_result['data'])
    print("shipping_result:", shipping_result, '\n')

    # Check the shipping result;
    # if a failure, send it to the error microservice.
    code = shipping_result["code"]
    if code not in range(200, 300):
        # Inform the error microservice
        #print('\n\n-----Invoking error microservice as shipping fails-----')
        print('\n\n-----Publishing the (shipping error) message with routing_key=shipping.error-----')

        # invoke_http(error_URL, method="POST", json=shipping_result)
        message = json.dumps(shipping_result)
        amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="shipping.error", 
            body=message, properties=pika.BasicProperties(delivery_mode = 2))

        print("\nShipping status ({:d}) published to the RabbitMQ Exchange:".format(
            code), shipping_result)

        # 7. Return error
        return {
            "code": 400,
            "data": {
                "order_result": order_result,
                "shipping_result": shipping_result
            },
            "message": "Simulated shipping record error sent for error handling."
        }

    # 7. Return created order, shipping record
    return {
        "code": 201,
        "data": {
            "order_result": order_result,
            "shipping_result": shipping_result
        }
    }


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
