const bookCollection = require('../model/database');

function remove(req, res) {
    const book = bookCollection.get(req.params.id);
    bookCollection.remove(book);
    res.json(book);
}

module.exports = remove;
