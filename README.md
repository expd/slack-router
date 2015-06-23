# slack-router

slack-router is simple slack incoming hook proxy. it is used to override message values based on regular expression.
this is currently used as a proxy between consul-alerts and slack allowing to route specific alerts to different channels

## usage

node index.js --config config.json

## configuration

slack-router expects a config file with the following structure:


