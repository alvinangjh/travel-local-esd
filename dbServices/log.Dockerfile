FROM python
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./log.py ./log.py
COPY ./amqp_setup.py ./amqp_setup.py
CMD [ "python", "./log.py" ]
