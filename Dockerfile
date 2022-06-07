FROM node:16

ENV HOST=127.0.0.1
ENV PORT=5000
ENV CACHE=true
ENV APP_LOGGING=true
ENV LOW_MIN=3
ENV LOW_MAX=10
ENV MIDDLE_MIN=11
ENV MIDDLE_MAX=25
ENV HIGH_MIN=26
ENV HIGH_MAX=200

WORKDIR /app

COPY package*.json ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn run build

CMD ["node", "dist/src/main"]
