const express = require('express');
const logger = require('morgan');

// Generic application setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Load routes into variables
const index = require('./routes/index');
const books = require('./services/books/routes');
const queue = require('./services/queue/queue');

// Routes
app.use('/', index);
app.use('/books', books);
app.use('/queue', queue);

module.exports = app;
