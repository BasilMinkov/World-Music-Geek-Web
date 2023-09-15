FROM photon:latest

WORKDIR /frontend

ARG BACKEND_URL

RUN tdnf install -y nodejs
COPY frontend /frontend
RUN npm install

ENTRYPOINT ["npm", "start"]