const express = require('express');
const router = express.Router();
const myRecipeController = require('../controllers/myRecipes');

router.get('/', myRecipeController.getRecipes);
router.delete('/deleteRecipe', myRecipeController.deleteRecipe);
router.get('/viewRecipe/:id', myRecipeController.viewRecipe)

module.exports = router;