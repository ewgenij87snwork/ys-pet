const express = require('express');
const router = new express.Router();

const usersController = require('../controllers/users.controller');

router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.post('/signup', usersController.signup);

module.exports = router;
