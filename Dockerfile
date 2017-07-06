FROM node:8

WORKDIR /
ADD package.json .
RUN yarn install

ADD . .
