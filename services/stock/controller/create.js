const stockCollection = require('../model/database');
const Stock = require('../model/Stock');

function newBook(req, res) {
    const isbn = req.body.isbn;
    const stock = req.body.stock;
    const book = new Stock(isbn, stock);
    stockCollection.insert(book);
    res.json(book);
}

module.exports = newBook;
