const express = require('express');
const router = express.Router();
const createRecipeController = require('../controllers/createRecipe');

router.get('/', createRecipeController.getCreateRecipe);

router.post('/submitRecipe', createRecipeController.submitRecipe);

module.exports = router;