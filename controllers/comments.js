const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');

module.exports = {
	postComment: async (req, res) => {
		try {
			const newComment = {
				comment: req.body.comment,
				likes: [],
				recipe: req.params.recipeId,
				createdByUser: req.body.createdByUser,
				user: req.user,
				userName: req.user.userName
			};
			const response = await Comment.create(newComment);
			console.log('Commented!');
			res.json({id: response.id});
		}
		catch (err) {
			console.error(err);
		}
	},
	likeComment: async (req, res) => {
		try {
			const user = req.user.userName;
			const comment = await Comment.findById(req.params.commentId);
			if (comment.likes.includes(user)) {
				const index = comment.likes.indexOf(user);
				comment.likes.splice(index, 1);
				await Comment.findOneAndUpdate({_id: req.params.commentId}, comment);
			}
			else {
				comment.likes.push(user);
				await Comment.findOneAndUpdate({_id: req.params.commentId}, comment);
			}
			console.log('Comment liked!');
			res.json('Liked!');
		}
		catch (err) {
			console.error(err);
		}
	},
	deleteComment: async (req, res) => {
		try {
			const commentToDelete = await Comment.findById(req.params.commentId);
			if (commentToDelete.userName !== req.user.userName) {
				res.json('Did not delete. You are not the comment creator!');
				return;
			}
			await Comment.findOneAndDelete({_id:req.params.commentId})
			console.log('Server side log of deleted comment');
			res.json('Response of deleted comment');
		}
		catch (err) {
			console.error(err);
		}
	}
}