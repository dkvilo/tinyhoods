cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/

if [ "$NODE_ENV" == "development" ]; then
  yarn build && yarn start
elif [ "$NODE_ENV" == "production" ]; then
  yarn build && yarn start
else
  echo "Unknown NODE_ENV Variable"
fi;
