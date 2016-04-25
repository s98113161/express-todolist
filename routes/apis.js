function isLoggedIn(req, res, next) {
	// if they aren't redirect them to the home page
    if (!req.isAuthenticated()){
		 res.redirect('/');
	}else{
		 // if user is authenticated in the session, carry on 
		 next();
	}
    
   
}

module.exports = function(app){
	//新增一筆schedule
	app.post('/api/schedule',isLoggedIn, function(req, res) {
		res.json({
			id:req.body.inputSchedule
			});
	});
	
}