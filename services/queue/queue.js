const express = require('express');
const router = express.Router();

router.post('/', newMessage);
router.get('/', readMessage);
router.get('/count', messageCount);

const queue = [];

function newMessage(req, res) {
    const message = req.body.msg;
    queue.push(message);    // fügt Nachricht am Ende des Arrays hinzu
    res.json(true);         // true == Message akzeptiert/gespeichert
}

function readMessage(req, res) {
    const message = queue.shift();
    if (typeof message === "undefined") {
        res.status(204);    // no content == leere Queue
        res.end();
    } else {                // Nachricht vorhanden
        res.json(message);
    }
}

function messageCount(req, res) {
    res.json({
        count: queue.length
    });
}

module.exports = router;
