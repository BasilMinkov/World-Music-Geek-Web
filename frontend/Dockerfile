
FROM node:latest as builder

WORKDIR /frontend
COPY frontend /frontend
RUN npm install
RUN npm run build

FROM caddy:latest

WORKDIR /static
COPY --from=builder frontend/build /static
COPY --from=builder frontend/Caddyfile /static/Caddyfile

ENTRYPOINT ["caddy", "file-server", "--listen", "0.0.0.0:8080"]
