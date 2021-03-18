FROM python
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./itinerary.py ./itinerary.py
CMD [ "python", "./itinerary.py" ]