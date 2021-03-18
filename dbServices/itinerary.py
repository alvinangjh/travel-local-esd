from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from flask_caching import Cache
from os import environ

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/travel_local_itinerary' #RMB TO UPDATE THIS
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL') or 'mysql+mysqlconnector://root@localhost:3306/travel_local_itinerary'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

config = {
    "DEBUG": True,
    "CACHE_TYPE": "RedisCache",
    "CACHE_DEFAULT_TIMEOUT": 300,
    "CACHE_REDIS_URL": environ.get('redisURL') or "redis://localhost:6379/0"
}

app.config.from_mapping(config)
cache = Cache(app)
CORS(app)  

class Itinerary(db.Model): #1 class refer to 1 row
    __tablename__ = 'itinerary'

    itineraryID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(256), nullable=False)
    startDate = db.Column(db.DateTime, nullable=False, default = datetime.utcnow)
    endDate = db.Column(db.DateTime, nullable=False, default = datetime.utcnow)
    theme = db.Column(db.String(256), nullable=False)
    userID = db.Column(db.Integer, nullable=False)
    shared = db.Column(db.Integer)

    def __init__(self, name, startDate, endDate, theme, userID, shared):
        #note for auto-increment dunnid put in init
        self.name = name
        self.startDate = startDate
        self.endDate = endDate
        self.theme = theme
        self.userID = userID
        self.shared = shared

    def json(self):
        return {"itineraryID": self.itineraryID, "name": self.name, "startDate": self.startDate, "endDate": self.endDate, "theme": self.theme, "userID": self.userID, "shared": self.shared}


class Event(db.Model): #1 class refer to 1 row
    __tablename__ = 'event'

    eventID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    poiUUID = db.Column(db.String(256), nullable=False)
    startTime = db.Column(db.Time, nullable=False, default = datetime.utcnow)
    endTime = db.Column(db.Time, nullable=False, default = datetime.utcnow)
    eventDate = db.Column(db.DateTime, nullable=False, default = datetime.utcnow)
    locType = db.Column (db.String(256), nullable=False)
    locCategory = db.Column(db.String(256), nullable=False)
    itineraryID = db.Column(db.Integer, nullable = False)

    def __init__(self, poiUUID, startTime, endTime, eventDate, locType, locCategory, itineraryID):
        #note for auto-increment dunnid put in init
        self.poiUUID = poiUUID
        self.startTime = startTime
        self.endTime = endTime
        self.eventDate = eventDate
        self.locType = locType
        self.locCategory = locCategory
        self.itineraryID = itineraryID

    def json(self):
        return {"itineraryID": self.itineraryID, "poiUUID": self.poiUUID, "startTime": str(self.startTime), "endTime": str(self.endTime), "eventDate": self.eventDate, "locType": self.locType, "locCategory": self.locCategory, "eventID": self.eventID}

#Create a single itinerary
@app.route("/itinerary", methods=['POST'])
def createItinerary():
    data = request.get_json()

    itineraryToAdd = Itinerary(**data)

    try:
        db.session.add(itineraryToAdd)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred creating the itinerary."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": itineraryToAdd.json()
        }
    ), 201

#Retrieve all itineraries by userID
@app.route("/itinerary/all/<int:userID>")
def get_all_itinerary(userID):
    itineraryList = Itinerary.query.filter_by(userID=userID).all()
    if len(itineraryList):
        return jsonify({
            "code": 200,
            "data": [itinerary.json() for itinerary in itineraryList]
        })
    else:
        return jsonify({
            "code": 404,
            "data": "No itinerary found."
        }), 404

#Retrieve all itineraries by itienraryID
@app.route("/itinerary/<int:itineraryID>")
def get_specific_itinerary(itineraryID):
    itinerary = Itinerary.query.filter_by(itineraryID=itineraryID).first()
    if itinerary:
        return jsonify(
            {
                "code": 200,
                "data": itinerary.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": "Itinerary not found."
        }
    ), 404

#Update itinerary details by itineraryID
@app.route("/itinerary/update/<int:itineraryID>", methods=['PUT'])
def update_itinerary(itineraryID):
    itinerary = Itinerary.query.filter_by(itineraryID=itineraryID).first()
    if itinerary:
        data = request.get_json()
        try:
            itinerary.name = data['name']
        except:
            pass
        try:
            itinerary.startDate = data['startDate']
        except:
            pass
        try:
            itinerary.endDate = data['endDate']
        except:
            pass
        try:
            itinerary.theme = data['theme'] 
        except:
            pass
        db.session.commit()
        cache.delete(str(itineraryID))
        return jsonify(
            {
                "code": 200,
                "data": itinerary.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "itineraryID": itineraryID
            },
            "message": "Itinerary not found."
        }
    ), 404

#Delete itinerary by itineraryID
@app.route("/itinerary/delete/<int:itineraryID>", methods=['DELETE'])
def delete_itinerary(itineraryID):
    itinerary = Itinerary.query.filter_by(itineraryID=itineraryID).first()
    if itinerary:
        db.session.delete(itinerary)
        db.session.commit()
        cache.delete(str(itineraryID))
        return jsonify(
            {
                "code": 200,
                "data": {
                    "itineraryID": itineraryID
                },
                "message": "Itinerary deleted."
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "itineraryID": itineraryID
            },
            "message": "Itinerary not found."
        }
    ), 404

#Add new event
@app.route("/event", methods=['POST'])
def addEvent():
    data = request.get_json()

    eventToAdd = Event(**data)

    try:
        db.session.add(eventToAdd)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred adding the Event."
            }
        ), 500
    cache.delete(str(data["itineraryID"]))
    return jsonify(
        {
            "code": 201,
            "data": eventToAdd.json()
        }
    ), 201

#Get event by itineraryID
@app.route("/event/<int:itineraryID>")
def get_all_events(itineraryID):
    eventList = Event.query.filter_by(itineraryID=itineraryID).all()
    if len(eventList):
        return jsonify(
            {
                "code": 200,
                "data": [event.json() for event in eventList]
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Events not found."
        }
    ), 404

#Update event details by eventID
@app.route("/event/update/<int:eventID>", methods=['PUT'])
def update_activity(eventID):
    event = Event.query.filter_by(eventID=eventID).first()
    if event:
        data = request.get_json()
        try:
            event.startTime = data['startTime']
        except:
            pass
        try:
            event.endTime = data['endTime']
        except:
            pass
        try:
            event.eventDate = data['eventDate'] 
        except:
            pass
        db.session.commit()
        cache.delete(str(event.json()["itineraryID"]))
        return jsonify(
            {
                "code": 200,
                "data": event.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "eventID": eventID
            },
            "message": "Event not found."
        }
    ), 404

#Delete event by eventID
@app.route("/event/delete/<int:eventID>", methods=['DELETE'])
def delete_activity(eventID):
    event = Event.query.filter_by(eventID=eventID).first()
    itineraryID = event.json()["itineraryID"]
    if event:
        db.session.delete(event)
        db.session.commit()
        cache.delete(str(itineraryID))
        return jsonify(
            {
                "code": 200,
                "data": {
                    "eventID": eventID
                },
                "message": "Event deleted."
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "eventID": eventID
            },
            "message": "Activity not found."
        }
    ), 404

if __name__ == '__main__':
    app.run(port=5000, debug=True) #rmb to update this
