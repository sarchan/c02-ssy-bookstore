const Loki = require('lokijs');
const Book = require('./Book');

const db = new Loki('books.json');
const books = db.addCollection('books');

books.insert(new Book('123-456', 'Franz Kafka', 'Der Prozess', 5.66));

module.exports = books;
