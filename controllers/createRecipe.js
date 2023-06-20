const Recipe = require('../models/Recipe');

module.exports = {
	getCreateRecipe: (req, res) => {
		res.render('createAndEditRecipe.ejs', {recipe: {_id: '', name: '', ingredients: [], steps: [], likes: []}, create: true});
	}
}