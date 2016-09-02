FROM alpine:latest

RUN apk add --no-cache nodejs
RUN apk add --no-cache curl

RUN npm install -g dredd
RUN npm install -g typings
RUN npm install -g gulp
RUN npm install -g pm2

WORKDIR /opt/microservice-lab

COPY ./typings.json ./typings.json

RUN typings install

COPY ./src ./src
COPY ./gulp ./gulp
COPY ./gulpfile.js ./gulpfile.js
COPY ./package.json ./package.json
COPY ./swagger.yml ./swagger.yml
COPY ./tsconfig.json ./tsconfig.json
COPY ./tslint.json ./tslint.json

RUN npm install

RUN gulp transpile

RUN gulp typescript-json-schema

CMD pm2 start --no-daemon ./dist/index.js > /dev/null