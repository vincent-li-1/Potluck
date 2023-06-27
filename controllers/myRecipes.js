const Recipe = require('../models/Recipe')

module.exports = {
    getRecipes: async (req, res) => {
		try {
			const recipes = await Recipe.find({userId:req.user.id});
			const numLikes = recipes.map(recipe => recipe.likes.length);
			res.render('myRecipes.ejs', {recipeList: recipes, numLikes: numLikes});
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
			const numLikes = selectedRecipe.likes.length;
			res.render('viewRecipe.ejs', {recipeToRender: selectedRecipe, numLikes: numLikes})
		}
		catch (err) {
			console.error(err);
		}
	},
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