FROM alpine:latest

RUN apk add --no-cache nodejs
RUN apk add --no-cache curl

RUN npm install -g dredd
RUN npm install -g typings
RUN npm install -g gulp

WORKDIR /opt/microservice-lab

COPY . .

RUN npm install