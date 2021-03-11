from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/travel_local_hiddengem' #RMB TO UPDATE THIS
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)  

class HG(db.Model): #1 class refer to 1 row
    __tablename__ = 'hiddengem'

    poiUUID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(256), nullable=False)
    address = db.Column(db.String(256), nullable=False)
    postalCode = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(256), nullable= True)
    locCategory = db.Column(db.String(256), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    imageUrl = db.Column(db.String(256), nullable=False)
    latitude = db.Column(db.Float, nullable = False)
    longitude = db.Column (db.Float, nullable = False)
    theme = db.Column(db.String(256), nullable = False)
    businessContact = db.Column(db.Integer, nullable=True)
    businessEmail = db.Column(db.String(256), nullable=True)
    startTime = db.Column(db.Time, nullable = False, default = datetime.utcnow)
    endTime = db.Column(db.Time, nullable= False, default = datetime.utcnow)
    businessWeb = db.Column(db.String(256), nullable=True)

    def __init__(self, name, address, postalCode, description, locCategory, rating, imageUrl, latitude, longitude, theme, businessContact, businessEmail, startTime, endTime, businessWeb):
        #note for auto-increment dunnid put in init
        self.name = name
        self.address = address
        self.postalCode = postalCode
        self.description = description
        self.locCategory = locCategory
        self.rating = rating
        self.imageUrl = imageUrl
        self.latitude = latitude
        self.longitude = longitude
        self.theme = theme
        self.businessContact = businessContact
        self.businessEmail = businessEmail
        self.startTime = startTime
        self.endTime = endTime
        self.businessWeb = businessWeb

    def json(self):
        return {"poiUUID": self.poiUUID, "name": self.name, "address":self.address, "postalCode":self.postalCode, "description": self.description, "locCategory": self.locCategory, "rating": self.rating, "imageUrl": self.imageUrl, "latitude": self.latitude, "longitude":self.longitude, "theme": self.theme, "businessContact":self.businessContact, "businessEmail":self.businessEmail, "startTime": str(self.startTime), "endTime": str(self.endTime), "businessWeb":self.businessWeb}


@app.route("/hiddengem", methods=['POST'])
def create_hg():
    data = request.get_json()

    hgToAdd = HG(**data)

    try:
        db.session.add(hgToAdd)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred adding the Hidden Gem."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": hgToAdd.json()
        }
    ), 201

@app.route("/hiddengem/all/<string:keyword>")
def get_all_hg(keyword):
    hgList = HG.query.filter(HG.name.like("%{}%".format(keyword))).all()

    if len(hgList):
        return jsonify(
            {
                "code": 200,
                "data": [hg.json() for hg in hgList]
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "No hidden gems found."
        }
    ), 404

@app.route("/hiddengem/one/<int:poiUUID>")
def get_specific_hg(poiUUID):
    hg = HG.query.filter_by(poiUUID=poiUUID).first()
    if hg:
        return jsonify(
            {
                "code": 200,
                "data": hg.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Hidden Gem not found."
        }
    ), 404

if __name__ == '__main__':
    app.run(port=5002, debug=True) #rmb to update this
