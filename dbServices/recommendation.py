from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from os import environ
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/travel_local_recommendation' #RMB TO UPDATE THIS
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL') or 'mysql+mysqlconnector://root@localhost:3306/travel_local_recommendation'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        "pool_pre_ping": True, 
        "pool_recycle": 300,
    }
db = SQLAlchemy(app)

CORS(app)  

class Recommendation(db.Model): #1 class refer to 1 row
    __tablename__ = 'recommendation'

    theme = db.Column(db.String(256), primary_key=True)
    poiUUID = db.Column(db.String(256), primary_key=True)
    name = db.Column(db.String(256), nullable = False)
    address = db.Column(db.Integer, nullable = False)
    postalCode = db.Column(db.String(256), nullable = False)
    description = db.Column(db.String(256), nullable = True)
    locCategory = db.Column(db.String(256), nullable= False)
    rating = db.Column(db.Integer, nullable= False)
    imageURL = db.Column(db.String(256), nullable = False)
    latitude = db.Column(db.String(256), nullable = False)
    longitude = db.Column(db.String(256), nullable = False)
    businessContact = db.Column(db.Integer, nullable= True)
    businessEmail = db.Column(db.String(256), nullable = True)
    startTime = db.Column(db.Time, nullable = False, default = datetime.utcnow)
    endTime = db.Column(db.Time, nullable = False, default = datetime.utcnow)
    businessWeb = db.Column(db.String(256), nullable = True)
    locType = db.Column (db.String(256), nullable=False)


    def __init__(self, theme, poiUUID, name, address, postalCode, description, locCategory, rating, imageURL, latitude, longitude, businessContact, businessEmail, startTime, endTime, businessWeb, locType):
        #note for auto-increment dunnid put in init
        self.theme = theme
        self.poiUUID = poiUUID
        self.name = name
        self.address = address
        self.postalCode = postalCode
        self.description = description
        self.locCategory = locCategory
        self.rating = rating
        self.imageURL = imageURL
        self.latitude = latitude
        self.longitude = longitude
        self.businessContact = businessContact
        self.businessEmail = businessEmail
        self.startTime = startTime
        self.endTime = endTime
        self.businessWeb = businessWeb
        self.locType = locType

    def json(self):
        return {"theme":self.theme, "poiUUID":self.poiUUID, 'name':self.name, 'address':self.address, 'postalCode':self.postalCode, 'description':self.description, 'locCategory': self.locCategory, 'rating': self.rating, 'imageURL': self.imageURL, 'latitude': self.latitude, 'longitude': self.longitude, 'businessContact': self.businessContact, 'businessEmail': self.businessEmail, 'startTime': str(self.startTime), 'endTime': str(self.endTime), 'businessWeb': self.businessWeb, 'locType':self.locType}

@app.route("/recommend/<string:theme>")
def get_specific_theme(theme):
    recommendationList = Recommendation.query.filter_by(theme=theme).all()
    if len(recommendationList):
        return jsonify(
            {
                "code": 200,
                "data": [recommendation.json() for recommendation in recommendationList]
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": "Recommendations not found."
        }
    ), 404


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002, debug=True) #rmb to update this
