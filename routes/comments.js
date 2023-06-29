const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

router.post('/createComment/:recipeId', commentsController.postComment);
router.put('/likeComment/:commentId', commentsController.likeComment);
router.delete('/deleteComment/:commentId', commentsController.deleteComment);

module.exports = router;