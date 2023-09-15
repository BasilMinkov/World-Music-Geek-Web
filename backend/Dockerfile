FROM photon:latest

WORKDIR /app

RUN tdnf install -y python3 python3-pip
COPY backend /app/backend
RUN pip3 install -r /app/backend/requirements.txt
RUN pip3 install gunicorn

COPY app.db /app/backend/
COPY photos /app/backend/app/

ENTRYPOINT ["gunicorn", "-w", "1", "blog:app", "-b", "0.0.0.0:5000"]