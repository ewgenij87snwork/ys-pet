const express = require('express');
const router = new express.Router();

const likesController = require('../controllers/likes.controller');
const { auth } = require('../middleware');

router.put('/', auth, likesController.updateLikes);

module.exports = router;
