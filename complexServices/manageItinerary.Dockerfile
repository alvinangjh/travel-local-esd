FROM python:3-buster
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./manageItinerary.py ./invokes.py ./amqp_setup.py ./
CMD [ "python", "./manageItinerary.py" ]
