FROM photon:latest

WORKDIR /frontend

RUN tdnf install -y nodejs
COPY frontend /frontend
RUN npm install

ENTRYPOINT ["npm", "start"]