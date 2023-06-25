const express = require('express');
const router = express.Router();
const myRecipeController = require('../controllers/myRecipes');
const {ensureAuth} = require('../middleware/auth');

router.get('/', ensureAuth, myRecipeController.getRecipes);
router.delete('/deleteRecipe', myRecipeController.deleteRecipe);
router.get('/viewRecipe/:id', ensureAuth, myRecipeController.viewRecipe)

module.exports = router;