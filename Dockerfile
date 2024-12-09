FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

ENV HOST 0.0.0.0

EXPOSE 8080

CMD ["yarn", "start"]