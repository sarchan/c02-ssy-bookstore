const stockCollection = require('../model/database');

function showBookByKey(req, res) {
    const book = stockCollection.get(req.params.id);
    res.json(book);
}

function showBookByISBN(req, res) {
    const isbn = req.params.id;
    const book = stockCollection.findOne({isbn: isbn});
    res.json(book);
}

module.exports = {
    byKey: showBookByKey,
    byISBN: showBookByISBN
};
