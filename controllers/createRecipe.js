const Recipe = require('../models/Recipe');

module.exports = {
	getCreateRecipe: (req, res) => {
		res.render('createAndEditRecipe.ejs', {recipe: {_id: '', name: '', ingredients: [], steps: [], likes: []}, create: true});
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