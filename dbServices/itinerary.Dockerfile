FROM python:3-buster
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./itinerary.py ./itinerary.py
CMD [ "python", "./itinerary.py" ]
# EXPOSE 5000
# CMD ["gunicorn","-w","4", "-b", "0.0.0.0:5000", "itinerary:app"]
