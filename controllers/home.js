module.exports = {
    getIndex: (req, res) => {
		if(req.user) {
			return res.redirect('/myRecipes');
		}
		res.render('index.ejs');
	}
}