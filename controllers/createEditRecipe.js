const Recipe = require('../models/Recipe');

module.exports = {
	getCreateEditRecipe: async (req, res) => {
		if (req.params.id) {
			try {
				const recipeToEdit = await Recipe.findById(req.params.id);
				res.render('createAndEditRecipe.ejs', {recipe: recipeToEdit, create: false});
			}
			catch (err) {
				console.error(err);
			}
		}
		else {
			res.render('createAndEditRecipe.ejs', {recipe: {_id: '', name: '', ingredients: [], steps: [], likes: []}, create: true});
		}
	},

	submitRecipe: async (req, res) => {
		try {
			const recipeToAdd = {
				name: req.body.name, 
				ingredients: req.body.ingredients, 
				steps: req.body.steps, 
				userId: req.user.id
			}
			req.body.recipeIdToUpdate ? await Recipe.findOneAndUpdate({_id:req.body.recipeIdToUpdate}, recipeToAdd) : await Recipe.create(recipeToAdd);
			console.log('Recipe upserted!');
			res.json('Upserted');
		}
		catch (err) {
			console.error(err);
		}
	}
}