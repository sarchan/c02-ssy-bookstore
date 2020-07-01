const Loki = require('lokijs');
const Book = require('./Book');

const db = new Loki('books.json');
const books = db.addCollection('books');

books.insert(new Book('123-456', 'Franz Kafka', 'Der Prozess', 5.66));
books.insert(new Book('234-567', 'J.K. Rowling', 'Harry Potter', 13.90));
books.insert(new Book('345-678', 'Stanislav Lem', 'Golem', 4.95));

module.exports = books;
