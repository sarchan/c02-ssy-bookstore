const bookCollection = require('../model/database');
const Book = require('../model/Book');

function showBookByKey(req, res) {
    const id = req.params.id;
    const book = bookCollection.get(id);

    if (book === null) {
        sendError(res);
    } else {
        res.json(book);
    }
}

function showBookByISBN(req, res) {
    const id = req.params.isbn;
    const book = bookCollection.findOne({isbn: id}); //findOne: sucht ein bestimmtes zB über isbn-Nr

    if (book === null) {
        sendError(res);
    } else {
        res.json(book);
    }
}

function sendError(response) {
    response.status(404);
    response.send("Book not available!");
}
//hier werden 2 funktionen gleichzeitig exportiert
module.exports = {
    byKey: showBookByKey,
    byISBN: showBookByISBN
};
//siehe kommentar in notizen
