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
	}
}