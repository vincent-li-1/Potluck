const express = require('express');
const router = express.Router();
const submitRecipeController = require('../controllers/submitRecipe');

router.put('/', submitRecipeController.submitRecipe);

module.exports = router;