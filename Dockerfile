FROM cgr.dev/chainguard/wolfi-base

WORKDIR /app

RUN adduser -D wmgeek
RUN chown -R wmgeek.wmgeek /app/
USER wmgeek

RUN apk add python-3.10
COPY backend /app/backend
RUN pip3 install -r /app/backend/requirements.txt
RUN pip3 install gunicorn

RUN apk add npm
COPY frontend /app/frontend

COPY app.db /app/backend/
COPY photos /app/backend/app/

ADD start.sh /app/
CMD /app/start.sh