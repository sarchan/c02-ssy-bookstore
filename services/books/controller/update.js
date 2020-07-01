const bookCollection = require('../model/database');
const Book = require('../model/Book');

function partialUpdate(req, res) {
    const book = bookCollection.get(req.params.id);
    // Attribute die im Body gesetzt sind auf Buch übertragen (keine Checks)
    for (let attribute of Object.keys(req.body)) {
        book[attribute] = req.body[attribute];
    }
    bookCollection.update(book);
    res.json(book);
}

function replaceBook(req, res) {
    const book = bookCollection.get(req.params.id);
    // neues Buch erzeugen
    const newBook = new Book(req.body.isbn, req.body.author, req.body.title, req.body.preis);
    // Metadaten kopieren
    newBook.$loki = book.$loki;
    newBook.meta = book.meta;
    // ... und altes Buch ersetzen
    bookCollection.update(newBook);
    res.json(newBook);
}

module.exports = {
    partial: partialUpdate,
    replace: replaceBook
};
