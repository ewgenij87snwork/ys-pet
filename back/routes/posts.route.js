const express = require('express');
const router = new express.Router();

const postsController = require('../controllers/posts.controller');

router.get('/', postsController.getPostsList);
router.get('/:postId', postsController.getPostById);

module.exports = router;
