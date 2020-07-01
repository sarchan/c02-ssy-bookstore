const stockCollection = require('../model/database');

function partialUpdate(req, res) {
    const book = stockCollection.get(req.params.id);
    // Attribute die im Body gesetzt sind auf Lager übertragen (keine Checks)
    for (let attribute of Object.keys(req.body)) {
        book[attribute] = req.body[attribute];
    }
    stockCollection.update(book);
    res.json(book);
}

module.exports = partialUpdate;
