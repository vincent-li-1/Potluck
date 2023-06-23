const express = require('express');
const router = express.Router();
const createEditRecipeController = require('../controllers/createEditRecipe');

router.get('/:id?', createEditRecipeController.getCreateEditRecipe);

module.exports = router;