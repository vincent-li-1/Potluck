const Recipe = require('../models/Recipe')

module.exports = {
    getIndex: async (req, res) => {
		try {
			const recipes = await Recipe.find();
			res.render('index.ejs', {recipeList: recipes});
		}
        catch (err) {
			console.error(err);
		}
    }
}