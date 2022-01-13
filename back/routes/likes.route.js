const express = require('express');
const router = new express.Router();

const likesController = require('../controllers/likes.controller');

router.put('/', likesController.updateLikes);

module.exports = router;
