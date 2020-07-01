const express = require('express');
const router = express.Router();

router.post('/', publish);
router.post('/subscribe', subscribe);
router.get('/subscribers', listSubscribers);

const subscribers = [];

function listSubscribers(req, res) {
    res.json(subscribers);
}

function subscribe(req, res) {
    subscribers.push(req.body.url);
    res.json(true);
}

async function publish(req, res) {
    const message = req.body.msg;

    for (let subscriber of subscribers) {
        await axios.post(subscriber, message);
    }

    res.json(true);     // true == Message akzeptiert/versendet
}

module.exports = router;
