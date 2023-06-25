const Recipe = require('../models/Recipe')

module.exports = {
    getRecipes: async (req, res) => {
		try {
			const recipes = await Recipe.find({userId:req.user.id});
			res.render('myRecipes.ejs', {recipeList: recipes});
		}
        catch (err) {
			console.error(err);
		}
    },
	deleteRecipe: async (req, res) => {
		try {
			await Recipe.findOneAndDelete({_id:req.body.recipeIdToDelete})
			console.log('Server side log of deleted recipe');
			res.json('Response of deleted recipe');
		}
		catch (err) {
			console.error(err);
		}
	},
	viewRecipe: async (req, res) => {
		try {
			const selectedRecipe = await Recipe.findById(req.params.id);
			res.render('viewRecipe.ejs', {recipeToRender: selectedRecipe})
		}
		catch (err) {
			console.error(err);
		}
	}
}