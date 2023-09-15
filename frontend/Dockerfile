FROM photon:latest

WORKDIR /app

RUN tdnf install -y nodejs
COPY frontend /app/frontend
RUN cd /app/frontend && npm install

ENTRYPOINT ["npm", "start"]