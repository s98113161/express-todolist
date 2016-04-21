function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (!req.isAuthenticated()){
		 res.redirect('/');
	}else{
		 next();
	}
    // if they aren't redirect them to the home page
   
}

module.exports = function(app,passport){
	app.get('/pannel',isLoggedIn, function(req, res) {
	res.render('pannel.ejs', { title: 'Express' });
	});
	app.get('/', function(req, res) {
		res.render('index.ejs', {message:req.flash("errorMsg")});
	});
	
	app.post('/',
		passport.authenticate('local', { successRedirect: '/pannel',
										failureRedirect: '/',
										failureFlash: true })
	);	
}
