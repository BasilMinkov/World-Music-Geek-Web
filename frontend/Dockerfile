FROM node:latest as builder
ARG ENV

WORKDIR /frontend
COPY frontend /frontend
RUN npm install
RUN echo $ENV
RUN if [ "$ENV" = "DEV" ]; then npm run build-dev; else npm run build-prod; fi

FROM caddy:latest

WORKDIR /static
COPY --from=builder frontend/build /static
COPY --from=builder frontend/Caddyfile /static/Caddyfile
COPY photos /static/photos

ENTRYPOINT ["caddy", "run", "--config", "Caddyfile"]
