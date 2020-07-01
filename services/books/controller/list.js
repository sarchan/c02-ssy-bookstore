const bookCollection = require('../model/database');

function getBookList(req, res) {
    const books = bookCollection.find();
    const result = [];

    for (let book of books) {
        result.push({
            primaryKey: book.$loki,
            isbn: book.isbn,
            author: book.author,
            title: book.title,
        });
    }
    res.json(result);
}

module.exports = getBookList;
