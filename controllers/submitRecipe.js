const Recipe = require('../models/Recipe');

module.exports = {
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