from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/travel_local' #RMB TO UPDATE THIS
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

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
            "message": "Itinerary not found."
        }
    ), 404

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

@app.route("/itinerary/delete/<int:itineraryID>", methods=['DELETE'])
def delete_book(itineraryID):
    itinerary = Itinerary.query.filter_by(itineraryID=itineraryID).first()
    if itinerary:
        db.session.delete(itinerary)
        db.session.commit()
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

if __name__ == '__main__':
    app.run(port=5000, debug=True) #rmb to update this
