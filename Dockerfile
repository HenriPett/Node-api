FROM node:16
WORKDIR /usr/docker/clean-node-api

COPY ./package.json .
RUN npm install

COPY ./src ./src

EXPOSE 5000
CMD npm start