const Recipe = require('../models/Recipe');

module.exports = {
	getCreateRecipe: (req, res) => {
		res.render('createRecipe.ejs');
	},
	submitRecipe: async (req, res) => {
		try {
			await Recipe.create({name: req.body.name, ingredients: req.body.ingredients, steps: req.body.steps, likes: []});
			console.log('Recipe added!');
			res.json('Added');
		}
		catch (err) {
			console.error(err);
		}
	}
}