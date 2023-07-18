const Recipe = require('../models/Recipe');
const Comment = require('../models/Comment');

module.exports = {
    getMyRecipes: async (req, res) => {
		try {
			const user = req.get('user-agent') === 'Dart/3.0 (dart:io)' ? req.get('userId') : req.user.id;
			const recipes = await Recipe.find({user:user}).sort({createdAt: 'desc'});
			const numCommentsArray = [];
			for (const recipe of recipes) {
				const comments = await Comment.find({recipe: recipe});
				numCommentsArray.push(comments.length);
			};
			if (req.get('user-agent') === 'Dart/3.0 (dart:io)') {
				obj = {
					recipes: recipes
				}
				res.status(200);
				return res.json(obj);
			};
			res.render('myRecipes.ejs', {recipeList: recipes, user: req.user, numCommentsArray: numCommentsArray});
		}
        catch (err) {
			console.error(err);
		}
    },
	deleteRecipe: async (req, res) => {
		try {
			await Recipe.findOneAndDelete({_id: req.params.id});
			await Comment.deleteMany({recipe: req.params.id});
			console.log('Server side log of deleted recipe');
			res.json('Deleted recipe');
		}
		catch (err) {
			console.error(err);
		}
	},
	viewRecipe: async (req, res) => {
		try {
			const selectedRecipe = await Recipe.findById(req.params.id);
			const comments = await Comment.find({recipe: selectedRecipe}).sort({createdAt: 'asc'});
			if (req.get('user-agent') === 'Dart/3.0 (dart:io)') {
				obj = {
					comments: comments
				}
				res.status(200);
				return res.json(obj);
			}
			let isMyRecipe = false;
			if (selectedRecipe.user == req.user.id) {
				isMyRecipe = true;
			}
			res.render('viewRecipe.ejs', {recipeToRender: selectedRecipe, isMyRecipe: isMyRecipe, user: req.user, comments: comments});
		}
		catch (err) {
			console.error(err);
		}
	},
	getCreateEditRecipe: async (req, res) => {
		if (req.params.id) {
			try {
				const recipeToEdit = await Recipe.findById(req.params.id);
				if (req.user.id != recipeToEdit.user) {
					return res.redirect('/recipes/feed');
				}
				res.render('createAndEditRecipe.ejs', {recipe: recipeToEdit, create: false});
			}
			catch (err) {
				console.error(err);
			}
		}
		else {
			res.render('createAndEditRecipe.ejs', {recipe: {_id: '', name: '', ingredients: [], steps: [], likes: [], user: req.user}, create: true});
		}
	},
	submitRecipe: async (req, res) => {
		console.log(req);
		try {
			const recipeToAdd = {
				name: req.body.name, 
				ingredients: req.body.ingredients, 
				steps: req.body.steps, 
				user: req.user,
				userName: req.user.userName
			}
			req.body.recipeIdToUpdate ? await Recipe.findOneAndUpdate({_id: req.body.recipeIdToUpdate}, recipeToAdd) : await Recipe.create(recipeToAdd);
			console.log('Recipe upserted!');
			res.json('Upserted');
		}
		catch (err) {
			console.error(err);
		}
	},
	likeRecipe: async (req, res) => {
		try {
			const user = req.get('user-agent') === 'Dart/3.0 (dart:io)' ? req.get('username') : req.user.userName;
			const recipeInDb = await Recipe.findById(req.params.id);
			if (recipeInDb.likes.includes(user)) {
				const index = recipeInDb.likes.indexOf(user);
				recipeInDb.likes.splice(index, 1);
				await Recipe.findOneAndUpdate({_id: req.params.id}, recipeInDb);
			}
			else {
				recipeInDb.likes.push(user);
				await Recipe.findOneAndUpdate({_id: req.params.id}, recipeInDb);
			}
			console.log('Recipe liked!');
			res.json('Liked!');
		}
		catch (err) {
			console.error(err);
		}
	},
	getFeed: async (req, res) => {
		try {
			const allRecipes = await Recipe.find().sort({createdAt: 'desc'});
			const numCommentsArray = [];
			const user = req.get('user-agent') === 'Dart/3.0 (dart:io)' ? req.get('userId') : req.user.id;
			for (let i = 0; i < allRecipes.length; i++) {
				
				if (allRecipes[i].user == user) {
					allRecipes.splice(i, 1);
					i--;
				}
				else {
					const numComments = (await Comment.find({recipe: allRecipes[i]})).length;
					numCommentsArray.push(numComments);
				}
			}
			if (req.get('user-agent') === 'Dart/3.0 (dart:io)') {
				obj = {
					recipes: allRecipes
				}
				res.status(200);
				return res.json(obj);
			}
			res.render('feed.ejs', {recipes: allRecipes, user: req.user, numCommentsArray: numCommentsArray});
		}
		catch (err) {
			console.error(err);
		}
	}
}