from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/travel_local' #RMB TO UPDATE THIS
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)  

class Recommendation(db.Model): #1 class refer to 1 row
    __tablename__ = 'recommendation'

    theme = db.Column(db.String(256), primary_key=True)
    poiUUID = db.Column(db.String(256), primary_key=True)
    locType = db.Column (db.String(256), nullable=False)

    def __init__(self, theme, poiUUID, locType):
        #note for auto-increment dunnid put in init
        self.theme = theme
        self.poiUUID = poiUUID
        self.locType = locType

    def json(self):
        return {"theme":self.theme, "poiUUID":self.poiUUID, "locType": self.locType}

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
            "message": "Recommendations not found."
        }
    ), 404


if __name__ == '__main__':
    app.run(port=5003, debug=True) #rmb to update this
