const axios = require('axios');

const startBookWorker = require('../services/books/worker')

async function startup() {
    //startBookWorker();
// subscriber hier aufrufen damit nicht immer manuell gemacht werden muss  - weil bei server neustart wieder weg
    const response1 = await axios.post('http://localhost:3000/pubsub/subscribe', {"url": "http://localhost/books/"})
    let data1 = {
    "url": "http://localhost/books/"
    }
    console.log("Subscribe von " +data1.url +", Status: " +response1.status)
    //oder so:
    let data = {
        "url": "http://localhost/stock/"
    }
    const response2 = await axios.post('http://localhost:3000/pubsub/subscribe', data)
    console.log("Subscribe von " +data.url+", Status: " +response2.status)
}

module.exports = startup; //funkction startup ohne () als referenzvariable übergeben
//beim start von node.js wird www aufgerufen, dort wird startup aufgerufen
