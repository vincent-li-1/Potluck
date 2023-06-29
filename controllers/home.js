module.exports = {
    getIndex: (req, res) => {
		if(req.user) {
			return res.redirect('/recipes/feed');
		}
		res.render('index.ejs');
	}
}