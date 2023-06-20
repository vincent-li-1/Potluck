const Recipe = require('../models/Recipe');

module.exports = {
	editRecipe: async (req, res) => {
		try {
			const recipeToEdit = await Recipe.findById(req.params.id);
			res.render('createAndEditRecipe.ejs', {recipe: recipeToEdit, create: false});
		}
		catch (err) {
			console.error(err);
		}
	},
	submitEditedRecipe: async (req, res) => {
		try {
			await Recipe.findOneAndUpdate({_id:req.body.recipeIdToUpdate}, req.body.edited);
			console.log('Recipe edited!');
			res.json('Edited');
		}
		catch (err) {
			console.error(err);
		}
	}
}