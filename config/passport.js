const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
  new LocalStrategy(
	  	{
		  usernameField: 'email', 
		  passwordField: 'password'
		},
  async (email, password, done) => {
    try {
		const user = await User.findOne({email: email.toLowerCase()});
      	if (!user) {
        	return done(null, false, {msg: `Email ${email} not found.`})
      	};
      	if (!user.password) {
        	return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      	};
      	user.comparePassword(password, (err, isMatch) => {
        	if (err) {return done(err)};
        	if (isMatch) {
          		return done(null, user);
        	}
        	return done(null, false, {msg: 'Invalid email or password.'});
      });
	}
	catch (err) {
		console.error(err);
		return done(error, false);
	}
	}))

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		if (user) {
			done(null, user);
		}
	}
	catch (err) {
		done(err, null);
		console.error(err);
	}
  })
}
