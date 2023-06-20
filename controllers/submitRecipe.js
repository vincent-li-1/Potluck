const Recipe = require('../models/Recipe');

module.exports = {
	submitRecipe: async (req, res) => {
		try {
			req.body.recipeIdToUpdate ? await Recipe.findOneAndUpdate({_id:req.body.recipeIdToUpdate}, req.body.recipe) : await Recipe.create(req.body.recipe);
			console.log('Recipe upserted!');
			res.json('Upserted');
		}
		catch (err) {
			console.error(err);
		}
	}
}