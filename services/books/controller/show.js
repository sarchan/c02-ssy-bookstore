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
    const id = req.params.id;
    const book = bookCollection.findOne({isbn: id});

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

module.exports = {
    byKey: showBookByKey,
    byISBN: showBookByISBN
};
