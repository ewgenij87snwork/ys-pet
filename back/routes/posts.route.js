const express = require('express');
const router = new express.Router();

const postsController = require('../controllers/posts.controller');

router.get('/filter', postsController.getPostsByTag);

router.get('/:postId', postsController.getPostById);
router.patch('/:postId', postsController.updatePost);
router.get('/', postsController.getPostsList);
router.post('/', postsController.createPost);
router.delete('/', postsController.deletePost);

module.exports = router;
