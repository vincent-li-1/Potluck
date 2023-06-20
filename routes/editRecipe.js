const express = require('express');
const router = express.Router();
const editRecipeController = require('../controllers/editRecipe');

router.get('/:id', editRecipeController.editRecipe);

module.exports = router;