const stockCollection = require('../model/database');

function list(req, res) {
    const books = stockCollection.find();
    res.json(books);
}

module.exports = list;
