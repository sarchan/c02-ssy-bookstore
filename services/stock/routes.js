const express = require('express');
const router = express.Router();
const list = require('./controller/list');
const show = require('./controller/show');
const create = require('./controller/create');
const update = require('./controller/update');

router.get('/', list);
router.post('/', create);
router.get('/:id', show.byKey);
router.get('/isbn/:id', show.byISBN);
router.patch('/:id', update);

module.exports = router;
