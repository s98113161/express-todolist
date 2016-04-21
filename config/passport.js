var users= {Mary:{id:1,username:"Mary",password:777888},John:{id:2,username:"John",password:888777}};
var LocalStrategy = require('passport-local').Strategy;


module.exports=function(passport){
	// used to serialize the user
	passport.serializeUser(function(user, done) {
		console.log(user);
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
		console.log(user);
        done(null, user);
        
    });
	passport.use('local',new LocalStrategy({
	usernameField : 'account',
    passwordField : 'password',
	passReqToCallback : true
	},
  function(req,username, password, done) {
	var user =users[username];
	console.log(user);
	if(user==null){
		console.log("Incorrect username.");
		 return done(null, false,{message:req.flash("errorMsg","Incorrect username.")});
	}
      if (user.password!=password) {
		console.log("Incorrect password.");
        return done(null, false, {message:req.flash("errorMsg","Incorrect password.")});
      }
	   return done(null, user);
  }
));
}