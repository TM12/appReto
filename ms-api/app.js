const cors = require('cors');
const express = require('express'),
  routes = require('./routes'),
  app = express();

app
  .use(cors())
  .set('port', (process.env.PORT || 3004))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(routes)
  ;
module.exports = app;
