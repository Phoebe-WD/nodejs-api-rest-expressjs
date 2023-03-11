FROM node:16 AS build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG NODE_ENV
ARG DATABASE_URL

ENV NODE_ENV=$NODE_ENV
ENV DATABASE_URL=$DATABASE_URL

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run migrations:run

EXPOSE 8080

CMD ["npm", "start"]
