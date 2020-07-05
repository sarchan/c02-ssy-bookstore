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
const stock = require('./services/stock/routes');
const queue = require('./services/queue/queue');
const pubsub = require('./services/pubsub/pubsub');
const value = require('./services/value/value') //wo liegt es im Projekt
const circuitbreaker = require('./services/circuitbreaker/circuitbreaker')

// Routes
app.use('/', index);
app.use('/books', books);
app.use('/stock', stock);
app.use('/queue', queue);
app.use('/pubsub', pubsub);
app.use('/value', value); //welcher Pfad wird benutzt
app.use('/circuitbreaker', circuitbreaker)

module.exports = app;
