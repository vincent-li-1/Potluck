const express = require('express');
const router = express.Router();
const createRecipeController = require('../controllers/createRecipe');

router.get('/', createRecipeController.getCreateRecipe);

module.exports = router;