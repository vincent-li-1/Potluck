const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	comment: {
	  type: String,
	  required: true,
	},
	likes: {
		type: [String],
		required: true,
		default: []
	},
	recipe: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Recipe',
		required: true
	},
	createdByUser: {
		type: Boolean,
		required: true,
		default: false
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	userName: {
		type: mongoose.Schema.Types.String,
		ref: 'User.userName',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
  });
  
  module.exports = mongoose.model('Comment', CommentSchema);