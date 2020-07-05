const bookCollection = require('../model/database');
const Book = require('../model/Book');

function partialUpdate(req, res) {
    const book = bookCollection.get(req.params.id);
    // Attribute die im Body gesetzt sind auf Buch übertragen (keine Checks)
    //Attributzugriff mit . : zB user.name
    //Attributzugriff mit []: user['name'], weil javascript objekte ähnlich wie hashmap - siehe Notizen
    for (let attribute of Object.keys(req.body))  {//objekt.keys liefert alle attribute des Objekts, ich kann zB nur preis angeben siehe Notizen
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
    newBook.$loki = book.$loki; //pk übertragen auf neues Buch damit replaced wird und nicht neues angelegt
    newBook.meta = book.meta; //metadaten vom alten Buch überragen,
    // ... und altes Buch ersetzen
    bookCollection.update(newBook);
    res.json(newBook);
}

module.exports = {
    partial: partialUpdate,
    replace: replaceBook
};
