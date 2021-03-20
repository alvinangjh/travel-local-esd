FROM python:3-buster
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./hiddengem.py ./hiddengem.py
CMD [ "python", "./hiddengem.py" ]
