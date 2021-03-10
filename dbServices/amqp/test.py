#test script for amqp
import os, sys

import requests
import amqp_setup
import pika
import json

message = {
    "userID": 23,
    "action": "test",
    "actionDetails": "test"
}
toSend = json.dumps(message)

amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="test.action", body=toSend)