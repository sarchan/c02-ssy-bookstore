const bookCollection = require('../model/database');
const Book = require('../model/Book');

function newBook(req, res) {
    const isbn = req.body.isbn;
    const author = req.body.author;
    const title = req.body.title;
    const price = req.body.price;

    const book = new Book(isbn, author, title, price);
    bookCollection.insert(book);

    res.json(book);
}

module.exports = newBook;
