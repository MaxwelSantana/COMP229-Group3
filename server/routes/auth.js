const express = require('express');
const router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');
let DB = require('../config/db');
let User = require('../models/user');

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		//server err
		if (err) {
			return next(err);
		}
		// is there a user login error?
		if (!user) {
			return res.status(304).json({ success: false, error: "Authenticate Error" });
		}
		req.login(user, (err) => {
			//server error?
			if (err) {
				return next(err);
			}
			const payload = {
				id: user._id,
				displayName: user.displayName,
				username: user.username,
				email: user.email
			}
			const authToken = jwt.sign(payload, DB.Secret, {
				expiresIn: 604800 // 1 Week
			});
			return res.json({
				success: true, msg: 'user Logged in Successfully', user: {
					id: user._id,
					displayName: user.displayName,
					username: user.username,
					email: user.email
				}, token: authToken
			});
		});
	})(req, res, next);
});

router.post('/register', (req, res, next) => {
	//instantiate a user object
	let newUser = new User({
		username: req.body.username,
		email: req.body.email,
		displayName: req.body.displayName
	});

	User.register(newUser, req.body.password, (err) => {
		if (err) {
			console.log("Error: inserting New User");
			return res.json({ success: false, error: JSON.stringify(err)});
		}
		else {
			const payload = { ...newUser, id: newUser._id };
			const authToken = jwt.sign(payload, DB.Secret, {
				expiresIn: 604800 // 1 Week
			});

			return passport.authenticate('local')(req, res, () => {
				return res.json({ success: true, msg: 'user Registered Successfully!', token: authToken });
			});
		}
	});
});

module.exports = router;
