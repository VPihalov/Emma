FROM node:16

WORKDIR /app

COPY package*.json ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn run build

CMD ["node", "dist/src/main"]
