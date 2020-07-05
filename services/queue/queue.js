const express = require('express');
const router = express.Router();

router.post('/', newMessage);
router.get('/', readMessage);
router.get('/count', messageCount);

const queue = []; //speichern der queue in array

//localhost:3000/queue/ - post request
function newMessage(req, res) { //händisch mit Postman aufgerufen
    const message = req.body.msg;
    queue.push(message);    // fügt Nachricht am Ende des Arrays hinzu
    res.json(true);         // true == Message akzeptiert/gespeichert
}

//localhost:3000/queue/ - get request

function readMessage(req, res) { //wird automatisch vom worker.js ausgelesen und un queue gepusht
    const message = queue.shift(); //entfernen des ersten Elements im queue[]
    if (typeof message === "undefined") {
        res.status(204);    // no content == leere Queue
        res.end();
    } else {                // Nachricht vorhanden
        res.json(message); //message als Antwort returnt
    }
}

function messageCount(req, res) {
    res.json({
        count: queue.length
    });
}

module.exports = router;
