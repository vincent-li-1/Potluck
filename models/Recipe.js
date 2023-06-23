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
	userId: {
		type: String,
		required: true
	}
  });
  
  module.exports = mongoose.model('Recipe', RecipeSchema);