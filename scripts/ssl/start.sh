docker run -it --rm \
  -v certs:/etc/letsencrypt \
  -v certs-data:/data/letsencrypt \
  deliverous/certbot \
  certonly \
  --webroot --webroot-path=/data/letsencrypt \
  --email datokviloria@gmail.com \
  --agree-tos --no-eff-email --staging \
  -d tinyhoods.net -d www.tinyhoods.net

