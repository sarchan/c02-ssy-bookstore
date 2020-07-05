//fragt laufend in der queue nach ob neues Buch da
//request: mit axios (einfacher als mit httpRequest)
// httpRquest mit axios einfacher

const axios = require('axios')

async function forward(){
    //books aus queue auslesen,
    const queueResponse = await axios.get('http://localhost:3000/queue/') //await: wartet auf Antwort
    if (queueResponse.status === 200){ //Nachricht vorhanden: book obj)
        const book = queueResponse.data //bei axios: .body, sonst res.body
        //per post an bookservice weiterleiten
        const bookResponse = await axios.post('http://localhost:3000/books/', book)
        console.log(("Neues Buch mit ID " + bookResponse.data.$loki + " angelegt"))
    }
    else {
        console.log("Queue lieferte Status " + queueResponse.status)
    }


}

function startForward(){
    forward().then() //async funtkon aufrufen, then() auswerten falls was zurückkommt
    setTimeout(startForward, 2000) //ruft sich alle 2 sek selber auf und damit auch die func forward()
}

module.exports = startForward //diesmal nicht in app.js automatisch aufgerufen sondern in startup.js
//funtkion ohne () heißt nicht Fuznktion aufrufen sondern als Variable referenz weitergeben