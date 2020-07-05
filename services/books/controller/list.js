const bookCollection = require('../model/database'); //weil in database.js direkt collection exportiert wird

function getBookList(req, res) {
    const books = bookCollection.find();
    const result = [];

    for (let book of books) {
        result.push({
            primaryKey: book.$loki, //loki fügt automatisch $loki hinzu = pk-attribut
            isbn: book.isbn,
            author: book.author,
            title: book.title,
        });
    }
    res.json(result);
}

module.exports = getBookList;
