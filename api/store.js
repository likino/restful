var express = require('express');
var router = express.Router();
var storeController = require('../controllers/store.js');

router.get('/stores', storeController.getStores);

router.get('/store', storeController.getStore);

router.post('/store', storeController.createStore);

router.delete('/store', storeController.deleteStore);

router.put('/store', storeController.updateStore);

module.exports = router;