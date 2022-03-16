FROM node:16.14.x
WORKDIR /usr/docker/clean-node-api

COPY ./package.json .
RUN npm install --only=prod

COPY ./src ./src

EXPOSE 5000
CMD npm start