FROM nginx:1.16.0-alpine

WORKDIR /etc/nginx/conf.d/

RUN rm default.conf

WORKDIR /

COPY ./conf/production/sites-enabled/tinyhoods.net.ssl.conf /etc/nginx/conf.d

EXPOSE 80 443

