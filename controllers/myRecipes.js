const Recipe = require('../models/Recipe')

module.exports = {
    getIndex: async (req, res) => {
		try {
			const recipes = await Recipe.find();
			res.render('myRecipes.ejs', {recipeList: recipes});
		}
        catch (err) {
			console.error(err);
		}
    },
	deleteRecipe: async (req, res) => {
		console.log(req.body.recipeIdToDelete);
		try {
			await Recipe.findOneAndDelete({_id:req.body.recipeIdToDelete})
			console.log('Server side log of deleted recipe');
			res.json('Response of deleted recipe');
		}
		catch (err) {
			console.error(err);
		}
	}
}