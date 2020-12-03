FROM ubuntu:latest

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install curl \
  build-essential pkg-config libcairo2-dev python libpango1.0-dev \
  libjpeg-dev libgif-dev librsvg2-dev -y

RUN curl -sL https://deb.nodesource.com/setup_current.x | bash -
RUN apt-get install -y nodejs

RUN npm install -g yarn

RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

COPY package.json yarn.lock ./
RUN yarn

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

EXPOSE 4000

ENTRYPOINT [ "bash", "entrypoint.sh" ]
