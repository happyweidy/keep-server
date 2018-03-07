const express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const notes = require('./api/notes');

mongoose.connect(config.mongodb.mongodbUrl);

const app = express();

app.use('/ping', (_, res) => {
  res.send('pong');
});

app.use('/notes', notes);

module.exports = app;
