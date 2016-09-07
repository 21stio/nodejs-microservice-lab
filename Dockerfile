FROM alpine:latest

RUN apk add --no-cache nodejs
RUN apk add --no-cache curl

RUN npm install -g dredd
RUN npm install -g typings
RUN npm install -g gulp
RUN npm install -g pm2
RUN npm install -g mocha

WORKDIR /opt/microservice-lab

COPY ./package.json ./package.json
RUN npm install

COPY ./typings.json ./typings.json
RUN typings install

COPY ./src ./src
COPY ./gulp ./gulp
COPY ./gulpfile.js ./gulpfile.js
COPY ./tsconfig.json ./tsconfig.json
RUN gulp lint
RUN gulp transpile

COPY ./swagger.yml ./swagger.yml
RUN gulp typescript-json-schema

COPY ./tslint.json ./tslint.json

CMD pm2 start --no-daemon ./dist/index.js > /dev/null