  
if [ "$NODE_ENV" == "development" ]; then
  yarn dev
elif [ "$NODE_ENV" == "production" ]; then
  yarn build && yarn start
else
  echo "Unknown NODE_ENV Variable"
fi;
