#!/usr/bin/env python3

import json
import os
import amqp_setup

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/travel_local' #RMB TO UPDATE THIS
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)  

class ErrorLog(db.Model): #1 class refer to 1 row
    __tablename__ = 'errorlog'

    errorID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timeStamp = db.Column(db.DateTime, nullable=False, default = datetime.utcnow)
    userID = db.Column(db.Integer, nullable = False)
    action = db.Column(db.String(256), nullable= False)
    errorDetails = db.Column(db.String(256), nullable=False)

    def __init__(self, userID, action, errorDetails):
        #note for auto-increment dunnid put in init
        self.userID = userID
        self.action = action
        self.errorDetails = errorDetails

    def json(self):
        return {"errorID":self.errorID, "timeStamp": str(self.timeStamp), "userID": self.userID, "action": self.action, "errorDetails": self.errorDetails}


monitorBindingKey = '*.error'

def receiveOrderLog():
    amqp_setup.check_setup()
    queue_name = 'Error_Log'

    amqp_setup.channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)

    amqp_setup.channel.start_consuming()

def callback(channel, method, properties, body):
    print("\nReceived an error log with routing key " + method.routing_key)
    results = processErrorLog(json.loads(body))
    print("Printing write results:")
    print(results[0].get_json())


def processErrorLog(error):

    with app.app_context():
        errorToAdd = ErrorLog(**error)

        try:
            db.session.add(errorToAdd)
            db.session.commit()
        except:
            return jsonify(
                {
                    "code": 500,
                    "message": "An error occurred adding the Action Log."
                }
            ), 500

        return jsonify(
            {
                "code": 201,
                "data": errorToAdd.json()
            }
        ), 201

if __name__ == '__main__':
    print("\nThis is " + os.path.basename(__file__), end='')
    print(": monitoring routing key '{}' in exchange '{}' ...".format(monitorBindingKey, amqp_setup.exchangename))
    receiveOrderLog()
