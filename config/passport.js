var users= [{id:1,username:"Mary",password:777888},{id:2,username:"John",password:888777}];
var User= require('../models/user.js');
var LocalStrategy = require('passport-local').Strategy;


module.exports=function(passport){
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id); //其實是在資料庫內的object.id
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
	//登入
	passport.use('local-login',new LocalStrategy({
	usernameField : 'account',
    passwordField : 'password',
	passReqToCallback : true
	},
	function(req,account, password, done) { // callback with account and password from our form
	process.nextTick(function() {
        // find a user whose account is the same as the forms account
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.account' :  account }, function(err, user) {
			console.log(user);
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('errorMsg', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('errorMsg', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    })}
	));
	
		//註冊
	    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with account
        usernameField : 'account',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, account, password, done) {

        process.nextTick(function() {

        // find a user whose account is the same as the forms account
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.account' :  account }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that account
            if (user) {
                return done(null, false, req.flash('errorMsg', 'That account is already taken.'));
            } else {

                // if there is no user with that account
                // create the user
                var newUser  = new User();

                // set the user's local credentials
                newUser.local.account    = account;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));
}