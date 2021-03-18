FROM python
WORKDIR /usr/src/app
COPY ./requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./recommendation.py ./recommendation.py
CMD [ "python", "./recommendation.py" ]
