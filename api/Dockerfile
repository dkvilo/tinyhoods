FROM node:12.16.1-slim

COPY package.json yarn.lock entrypoint.sh /
RUN yarn

COPY . /usr/src/app

WORKDIR /usr/src/app

EXPOSE 4000

ENTRYPOINT [ "bash", "entrypoint.sh" ]
