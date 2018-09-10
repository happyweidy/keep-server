const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const notes = require('./api/notes');

mongoose.connect(config.mongodb.mongodbUrl);

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/ping', (_, res) => {
  res.send('pong1');
});

app.use('/notes', notes);

module.exports = app;
