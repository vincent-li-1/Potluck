const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipes');
const {ensureAuth} = require('../middleware/auth');

router.get('/myRecipes', ensureAuth, recipeController.getMyRecipes);
router.delete('/deleteRecipe', recipeController.deleteRecipe);
router.get('/viewMyRecipe/:id', ensureAuth, recipeController.viewMyRecipe)
router.get('/createEditRecipe/:id?', ensureAuth, recipeController.getCreateEditRecipe);
router.put('/submitRecipe', recipeController.submitRecipe);
router.put('/likeRecipe', recipeController.likeRecipe);

module.exports = router;