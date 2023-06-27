const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const connectDB = require('./config/database');
const homeRoutes = require('./routes/home');
const myRecipesRoutes = require('./routes/myRecipes');

require('dotenv').config({path:'./config/.env'});

require('./config/passport')(passport);

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.DB_STRING, 
			dbName: "recipes", 
			collection: "sessions"
		})
	})
)

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', homeRoutes);
app.use('/myRecipes', myRecipesRoutes);

app.listen(process.env.PORT, () => console.log(`Server running`));

