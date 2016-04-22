function isLoggedIn(req, res, next) {
	// if they aren't redirect them to the home page
    if (!req.isAuthenticated()){
		 res.redirect('/');
	}else{
		 // if user is authenticated in the session, carry on 
		 next();
	}
    
   
}

module.exports = function(app,passport){

	app.get('/', function(req, res) {
		if(req.isAuthenticated()){ //有登入就引進/pannel
			res.redirect('/pannel');
		}else{
			res.render('index.ejs', {message:req.flash("errorMsg")}); //只要req.flash提取過一次之後，便會被抹除。
		}
	});
	app.post('/',
		passport.authenticate('local', { successRedirect: '/pannel',
										 failureRedirect: '/',
										 failureFlash: true })
	);
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});	
	app.get('/pannel',isLoggedIn, function(req, res) {
		res.render('pannel.ejs', {});
	});
	
}
