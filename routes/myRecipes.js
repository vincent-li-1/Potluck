const express = require('express');
const router = express.Router();
const myRecipeController = require('../controllers/myRecipes');

router.get('/', myRecipeController.getIndex);
router.delete('/deleteRecipe', myRecipeController.deleteRecipe);

module.exports = router;