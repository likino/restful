var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');

router.get('/users', userController.getUsers);

router.get('/user', userController.getUser);

router.post('/user', userController.createUser);

router.delete('/user', userController.deleteUser);

router.put('/user', userController.updateUser);

module.exports = router;