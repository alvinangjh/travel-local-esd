from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/travel_local' #RMB TO UPDATE THIS
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)  

class Activity(db.Model): #1 class refer to 1 row
    __tablename__ = 'activity'

    activityID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    poiUUID = db.Column(db.String(256), nullable=False)
    startTime = db.Column(db.Time, nullable=False, default = datetime.utcnow)
    endTime = db.Column(db.Time, nullable=False, default = datetime.utcnow)
    activityDate = db.Column(db.DateTime, nullable=False, default = datetime.utcnow)
    locType = db.Column (db.String(256), nullable=False)
    locCategory = db.Column(db.String(256), nullable=False)
    itineraryID = db.Column(db.Integer, nullable = False)

    def __init__(self, poiUUID, startTime, endTime, activityDate, locType, locCategory, itineraryID):
        #note for auto-increment dunnid put in init
        self.poiUUID = poiUUID
        self.startTime = startTime
        self.endTime = endTime
        self.activityDate = activityDate
        self.locType = locType
        self.locCategory = locCategory
        self.itineraryID = itineraryID

    def json(self):
        return {"itineraryID": self.itineraryID, "poiUUID": self.poiUUID, "startTime": str(self.startTime), "endTime": str(self.endTime), "activityDate": self.activityDate, "locType": self.locType, "locCategory": self.locCategory, "activityID": self.activityID}


@app.route("/activity", methods=['POST'])
def addActivity():
    data = request.get_json()

    activityToAdd = Activity(**data)

    try:
        db.session.add(activityToAdd)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred adding the Activity."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": activityToAdd.json()
        }
    ), 201


@app.route("/activity/<int:itineraryID>")
def get_specific_itinerary(itineraryID):
    activityList = Activity.query.filter_by(itineraryID=itineraryID).all()
    if len(activityList):
        return jsonify(
            {
                "code": 200,
                "data": [activity.json() for activity in activityList]
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Activities not found."
        }
    ), 404

@app.route("/activity/update/<int:activityID>", methods=['PUT'])
def update_activity(activityID):
    activity = Activity.query.filter_by(activityID=activityID).first()
    if activity:
        data = request.get_json()
        try:
            activity.startTime = data['startTime']
        except:
            pass
        try:
            activity.endTime = data['endTime']
        except:
            pass
        try:
            activity.activityDate = data['activityDate'] 
        except:
            pass
        db.session.commit()
        return jsonify(
            {
                "code": 200,
                "data": activity.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "activityID": activityID
            },
            "message": "Activity not found."
        }
    ), 404

@app.route("/activity/delete/<int:activityID>", methods=['DELETE'])
def delete_activity(activityID):
    activity = Activity.query.filter_by(activityID=activityID).first()
    if activity:
        db.session.delete(activity)
        db.session.commit()
        return jsonify(
            {
                "code": 200,
                "data": {
                    "activityID": activityID
                },
                "message": "Activity deleted."
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "activityID": activityID
            },
            "message": "Activity not found."
        }
    ), 404

if __name__ == '__main__':
    app.run(port=5001, debug=True) #rmb to update this
