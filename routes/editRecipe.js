const express = require('express');
const router = express.Router();
const editRecipeController = require('../controllers/editRecipe');

router.get('/:id', editRecipeController.editRecipe);

router.put('/submitEditedRecipe', editRecipeController.submitEditedRecipe);

module.exports = router;