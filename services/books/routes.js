const express = require('express');
const router = express.Router();

//variablen : wo im Projekt liegt _Funtkion - dort ist function gespeichert
const list = require('./controller/list');
const show = require('./controller/show');
const create = require('./controller/create');
const update = require('./controller/update');
const remove = require('./controller/remove');
const lockController = require('./controller/lock') //hat beide attribute lock und unlock im module.exports

//route festlegen
router.get('/', list);
router.post('/', create);

//hier funktion als .parameter
router.get('/:id', show.byKey);
router.get('/isbn/:isbn', show.byISBN);

router.patch('/:id', update.partial);
router.put('/:id', update.replace);

router.delete('/:id', remove);

router.post('/lock', lockController.lock) //im attribut .lock ist Methode lock referenziert ACHTUNG: keine (), sonst Methodenaufruf! Fehlermeldung: TypeError: Cannot read property 'json' of undefined
router.post('/unlock', lockController.unlock)

module.exports = router;
