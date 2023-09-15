FROM debian:12-slim
RUN apt-get update

WORKDIR /app

RUN apt install python3.10
COPY backend /app/backend
RUN pip3 install -r /app/backend/requirements.txt
RUN pip3 install gunicorn

RUN apt install npm
COPY frontend /app/frontend

COPY app.db /app/backend/
COPY photos /app/backend/app/

ADD start.sh /app/
CMD /app/start.sh