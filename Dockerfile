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

COPY ./package.json ./package.json
RUN npm install

COPY ./gulp ./gulp
COPY ./gulpfile.js ./gulpfile.js
COPY ./tsconfig.json ./tsconfig.json
RUN gulp transpile

COPY ./swagger.yml ./swagger.yml
COPY ./src ./src
RUN gulp typescript-json-schema

COPY ./tslint.json ./tslint.json

CMD pm2 start --no-daemon ./dist/index.js > /dev/null