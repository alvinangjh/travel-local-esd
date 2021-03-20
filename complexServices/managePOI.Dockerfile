FROM python:3-buster
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./managePOI.py ./invokes.py ./amqp_setup.py ./
CMD [ "python", "./managePOI.py" ]
