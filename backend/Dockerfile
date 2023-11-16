FROM photon:latest

WORKDIR /backend

RUN tdnf install -y python3 python3-pip
COPY backend /backend
RUN pip3 install -r /backend/requirements.txt
RUN pip3 install gunicorn

COPY app.db /backend/
#COPY photos /backend/app/photos
EXPOSE 8080

ENTRYPOINT ["gunicorn", "-w", "1", "blog:app", "-b", "0.0.0.0:8080"]
