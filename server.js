const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
const Recipe = require('./src/recipe')
require('dotenv').config();

let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = 'recipes'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
	.then(client => {
		console.log(`Connected to ${dbName} database`);
		db = client.db(dbName);
	})
	.catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
	db.collection('recipes').find().toArray()
	.then(data => {
		res.render('index.ejs', {recipeList: data});
	})
	.catch(error => console.error(error));
})

app.post('/addRecipe', (req, res) => {
	const recipeToAdd = new Recipe(req.body.recipeName, req.body.ingredients, req.body.steps);
	db.collection('recipes').insertOne(recipeToAdd)
		.then(result => {
			console.log('Recipe added');
			res.redirect('/')
		})
		.catch(error => console.error(error));
})

app.listen(process.env.PORT || PORT, () => console.log(`Server running on port ${PORT}`));