const express = require('express');
const router = express.Router();
const createEditRecipeController = require('../controllers/createEditRecipe');
const {ensureAuth} = require('../middleware/auth');

router.get('/:id?', ensureAuth, createEditRecipeController.getCreateEditRecipe);
router.put('/submitRecipe', createEditRecipeController.submitRecipe)

module.exports = router;