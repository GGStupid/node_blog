FROM node:8.12.0-alpine

LABEL MAINTAINER="GG"

ENV APP_SERVICE_DIR=/usr/src/app \
    APP_PORT=3000

WORKDIR ${APP_SERVICE_DIR}

COPY package.json ${APP_SERVICE_DIR}

RUN npm i --pro

COPY . ${APP_SERVICE_DIR}

EXPOSE ${APP_PORT}

CMD [ "npm","run","start" ]
