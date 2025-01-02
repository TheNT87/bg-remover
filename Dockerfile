FROM node:23-slim

WORKDIR /opt

COPY package.json package.json

RUN npm i

COPY index.js index.js

CMD [ "node", "index.js" ]