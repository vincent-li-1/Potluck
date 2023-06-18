const express = require('express');
const router = express.Router();
const myRecipeController = require('../controllers/myRecipes');

router.get('/', myRecipeController.getIndex);

module.exports = router;