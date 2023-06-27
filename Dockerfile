FROM node:16

WORKDIR /app

COPY package.json yarn.lock ./

COPY . .

RUN yarn

EXPOSE 3000

CMD yarn migrate:db && yarn serve:api