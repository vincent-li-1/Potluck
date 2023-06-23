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
	}
}