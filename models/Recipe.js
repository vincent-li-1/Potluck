const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
	name: {
	  type: String,
	  required: true,
	},
	ingredients: {
	  type: [String],
	  required: true,
	},
	steps: {
		type: [String],
		required: true,
	},
	likes: {
		type: [String],
		required: true,
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
  
  module.exports = mongoose.model('Recipe', RecipeSchema);