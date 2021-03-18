#!/usr/bin/env python3

import json
import os, sys
sys.path.append("../")
import amqp_setup

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/travel_local_log' #RMB TO UPDATE THIS
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)  

class Log(db.Model): #1 class refer to 1 row
    __tablename__ = 'log'

    logID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timeStamp = db.Column(db.DateTime, nullable=False, default = datetime.utcnow)
    userID = db.Column(db.Integer, nullable = False)
    action = db.Column(db.String(256), nullable= False)
    logDetails = db.Column(db.String(256), nullable=False)
    status = db.Column(db.String(256), nullable = False)

    def __init__(self, userID, action, logDetails, status):
        #note for auto-increment dunnid put in init
        self.userID = userID
        self.action = action
        self.logDetails = logDetails
        self.status = status

    def json(self):
        return {"logID":self.logID, "timeStamp": str(self.timeStamp), "userID": self.userID, "action": self.action, "logDetails": self.logDetails, "status": self.status}


monitorBindingKey = '*.log' #e.g. addEvent.error.log refers to error log of an add event action, addEvent.success.log refers to success log of an add event action 

def receiveOrderLog():
    amqp_setup.check_setup()
    queue_name = 'Log'

    amqp_setup.channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

    amqp_setup.channel.start_consuming()

def callback(channel, method, properties, body):
    print("\nReceived an action log with routing key " + method.routing_key)
    status = method.routing_key.split('.')[1]
    results = processActionLog(json.loads(body), status)
    print("Printing write results:")
    print(results[0].get_json())


def processActionLog(properties, status):

    with app.app_context():
        logToAdd = Log(**properties, status=status)
        
        try:
            db.session.add(logToAdd)
            db.session.commit()
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "code": 500,
                    "message": "An error occurred adding the Log."
                }
            ), 500

        return jsonify(
            {
                "code": 201,
                "data": logToAdd.json()
            }
        ), 201

if __name__ == '__main__':
    print("\nThis is " + os.path.basename(__file__), end='')
    print(": monitoring routing key '{}' in exchange '{}' ...".format(monitorBindingKey, amqp_setup.exchangename))
    receiveOrderLog()
