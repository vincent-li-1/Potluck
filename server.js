const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
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
	console.log('Responding');
	res.render('index.ejs');
})

app.listen(process.env.PORT || PORT, () => console.log(`Server running on port ${PORT}`));