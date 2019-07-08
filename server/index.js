const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
// const request = require('request');

const app = express();
const YELP_API_KEY = process.env.YELP_API_KEY;
const YELP_CLIENT_ID = process.env.YELP_CLIENT_ID;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use(require('./routes'));

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
  // console.log(process.env.YELP_API_KEY)
);
