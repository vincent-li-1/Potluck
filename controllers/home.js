module.exports = {
    getIndex: (req, res) => {
		if(req.user) {
			return res.redirect('/recipes/myRecipes');
		}
		res.render('index.ejs');
	}
}