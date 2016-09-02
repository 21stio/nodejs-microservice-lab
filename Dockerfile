FROM alpine:latest

RUN apk add --no-cache nodejs
RUN apk add --no-cache curl

WORKDIR /opt/microservice-lab

COPY ./src ./src
COPY ./gulp ./gulp
COPY ./gulp ./gulp
COPY ./gulpfile.js ./gulpfile.js
COPY ./package.json ./package.json
COPY ./swagger.yml ./swagger.yml
COPY ./typings.json ./typings.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./tslint.json ./tslint.json

RUN npm install -g dredd
RUN npm install -g typings
RUN npm install -g gulp
RUN npm install -g pm2

RUN npm install

RUN typings install

RUN gulp transpile

RUN gulp typescript-json-schema

CMD pm2 start --no-daemon ./dist/index.js > /dev/null