var Schedule= require('../models/schedule.js');
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
		var newSchedule = new Schedule({user_account_id:req.user.id,
										body:req.body.inputSchedule
										});
				newSchedule.save(function(err) {
                    if (err)
                        throw err;
					else{
                    res.status('200');
				//	res.json(newSchedule);
					res.redirect('/');
					}
                });
		
	});
	app.get('/api/schedule',isLoggedIn, function(req, res) {
		Schedule.find({user_account_id:req.user.id}, function(err, schedules) {
		if (err) throw err;
		else{
				res.status('200');
				res.json(schedules);
			}
		});
		
	});
	
}