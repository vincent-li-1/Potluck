const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

module.exports = {
	postLogin: (req, res, next) => {
		const validationErrors = [];
		if (!validator.isEmail(req.body.email)) validationErrors.push({msg: 'Please enter a valid email address.'});
		if (validator.isEmpty(req.body.password)) validationErrors.push({msg: 'Password cannot be blank.'});

		if (validationErrors.length) {
			if (req.get('user-agent') === 'Dart/3.0 (dart:io)') {
				res.status(400);
				return res.json('Invalid email or password');
			}
			else {
				req.flash('errors', validationErrors);
				return res.redirect('/');
			}
		}
		
		else {
			req.body.email = validator.normalizeEmail(req.body.email, {gmail_remove_dots: false});

			passport.authenticate('local', (err, user, info) => {
				if (err) {return next(err)};
				if (!user) {
					if (req.get('user-agent') === 'Dart/3.0 (dart:io)') {
						res.status(400);
						return res.json('Incorrect email or password');
					}
				  	req.flash('errors', info);
				 	return res.redirect('/');
				}
				req.logIn(user, (err) => {
				  if (err) {return next(err)};
				  if (req.get('user-agent') === 'Dart/3.0 (dart:io)') {
					res.status(200);
					user = {
						id: user.id,
						username: user.userName
					}
					console.log(user);
					return res.json(user)
				  }
				  req.flash('success', {msg: 'Success! You are logged in.'});
				  res.redirect(req.session.returnTo || '/recipes/feed');
				})
			  })(req, res, next);
		}
	},

	logout: (req, res) => {
		req.logout(() => {
		  console.log('User has logged out.')
		})
		req.session.destroy((err) => {
		  if (err) console.log('Error : Failed to destroy the session during logout.', err);
		  req.user = null
		  res.redirect('/');
		})
	},

	getSignup: (req, res) => {
		if (req.user) {
			return res.redirect('/recipes/feed');
		}
		res.render('signup.ejs', {
			title: 'Create Account'
		})
	},

	postSignup: async (req, res, next) => {
		const validationErrors = [];
		if (!validator.isEmail(req.body.email)) validationErrors.push({msg: 'Please enter a valid email address.'});
		if (!validator.isLength(req.body.password, {min: 8})) validationErrors.push({msg: 'Password must be at least 8 characters long'});
		if (req.body.password !== req.body.confirmPassword) validationErrors.push({msg: 'Passwords do not match'});
	  
		if (validationErrors.length) {
			if (req.get('user-agent') === 'Dart/3.0 (dart:io)') {
				res.status(400);
				return res.json(validationErrors[0].msg);
			}
		  req.flash('errors', validationErrors);
		  return res.redirect('../signup');
		}
		req.body.email = validator.normalizeEmail(req.body.email, {gmail_remove_dots: false});
	  
		const user = new User({
		  userName: req.body.userName,
		  email: req.body.email,
		  password: req.body.password
		})
	
		try {
			const existingUser = await User.findOne({$or: [
				{email: req.body.email},
				{userName: req.body.userName}
			]});
			if (existingUser) {
				if (req.get('user-agent') === 'Dart/3.0 (dart:io)') {
					res.status(400);
					return res.json('Account with that email address or username already exists.');
				}
				req.flash('errors', {msg: 'Account with that email address or username already exists.'});
				return res.redirect('../signup');
			};
			try {
				await user.save();
				console.log(user);
				if (req.get('user-agent') === 'Dart/3.0 (dart:io)') {
					res.status(200);
					return res.json(obj = {
						id: user.id,
						username: user.userName
					});
				}
				req.logIn(user, (err) => {
					if (err) {
					  return next(err);
					}
					res.redirect('/recipes/feed');
				  });
			}
			catch (err) {
				console.error(err);
			}
		}
		catch (err) {
			console.error(err);
		}
	}
}