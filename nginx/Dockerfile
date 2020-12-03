FROM nginx:1.16.0-alpine

WORKDIR /etc/nginx/conf.d/

RUN rm default.conf

WORKDIR /

COPY ./conf/production/sites-enabled/tinyhoods.net.conf /etc/nginx/conf.d
COPY ./error_pages/50x.html                             /etc/error_pages/50x.html

COPY ./ssl/certs/cert.pem                               /etc/ssl/certs/cert.pem
COPY ./ssl/certs/cloudflare.crt                         /etc/ssl/certs/cloudflare.crt
COPY ./ssl/private/key.pem                              /etc/ssl/private/key.pem

EXPOSE 80 443
