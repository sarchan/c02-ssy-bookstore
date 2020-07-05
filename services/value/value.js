const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/:isbn', getBookValue)

async function getBookValue(req, res) {
    //locking
    const lockResponse  = await axios.post('http://localhost:3000/books/lock')
    if (lockResponse.data === "failed"){
        res.status(423); //status locked
        res.end();
        return
    }
    //soll Preis * Anzahl des Buchs in Stock retournieren
    const isbn = req.params.isbn
    const bookResponse = await axios.get('http://localhost:3000/books/isbn/' + isbn) //isbn ist bestandteil des requests
    const book = bookResponse.data

    await await axios.post('http://localhost:3000/books/lock') //book wieder unlocken

    const stockResponse = await axios.get('http://localhost:3000/stock/isbn/' + isbn) //isbn ist bestandteil des requests
    const stock = stockResponse.data

    const  result = {
        isbn: isbn, //javascript braucht für attribut keine "", kann aber sein, json braucht immer
        "value": book.preis * stock.stock
    }
    await res.json(result) //geht auch ohne await, besser mit
}
module.exports = router