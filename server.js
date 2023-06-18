const express = require('express');
const app = express();
const connectDB = require('./config/database');
const myRecipesRoutes = require('./routes/myRecipes');
const createRecipeRoutes = require('./routes/createRecipe');
const PORT = 8000;
require('dotenv').config({path: './config/.env'});

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', myRecipesRoutes);
app.use('/createRecipe', createRecipeRoutes);

app.listen(process.env.PORT || PORT, () => console.log(`Server running`));

