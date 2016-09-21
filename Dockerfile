FROM alpine:latest

RUN apk add --no-cache nodejs
RUN apk add --no-cache curl

RUN npm install -g dredd
RUN npm install -g typings
RUN npm install -g gulp
RUN npm install -g pm2
RUN npm install -g mocha

WORKDIR /opt/application

COPY ./package.json ./package.json
RUN npm install

COPY ./typings.json ./typings.json
RUN typings install

COPY ./src ./src
COPY ./gulp ./gulp
COPY ./gulpfile.js ./gulpfile.js

COPY ./tslint.json ./tslint.json
RUN gulp lint

COPY ./tsconfig.json ./tsconfig.json
RUN gulp transpile

COPY ./swagger.yml ./swagger.yml
RUN gulp typescript-json-schema

CMD pm2 start --no-daemon ./dist/index.js