const Loki = require('lokijs');
const Stock = require('./Stock');

const db = new Loki('stock.json');
const stock = db.addCollection('stock');

stock.insert(new Stock('123-456', 20));
stock.insert(new Stock('234-567', 100));
stock.insert(new Stock('345-678', 10));

module.exports = stock;
