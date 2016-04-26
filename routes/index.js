var Schedule= require('../models/schedule.js');
var moment = require('moment');
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
	//	-------登入-------
	app.get('/', function(req, res) {
		if(req.isAuthenticated()){ //有登入就引進/pannel
			res.redirect('/user/pannel');
		}else{
			res.render('index.ejs', {message:req.flash("errorMsg")}); //只要req.flash提取過一次之後，便會被抹除。
		}
	});
	app.post('/',
		passport.authenticate('local-login', {  successRedirect: '/user/pannel',
												failureRedirect: '/',
												failureFlash: true })
	);
	//	-------註冊-------
	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message:req.flash("errorMsg")});
	});
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/user/pannel', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
	//	-------登出-------
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});	
	//	-------主頁面-------
	app.get('/user/pannel',isLoggedIn, function(req, res) {
		Schedule.find({user_account_id:req.user.id}, function(err, schedules) {
		if (err) throw err;
		else{
			
			for(i=0;i<schedules.length;i++){
				var temp;
				
				console.log(schedules[i].createdAt);
				temp = schedules[i].createdAt;
				schedules[i].createdAt=undefined;
				schedules[i].createdAt = new Date(temp).toLocaleString();
				console.log(schedules[i].createdAt);
			}
				res.status('200');
				res.render('pannel.ejs', {schedules:schedules});
			}
		});
		
	});
	//	-------Test-------
	app.get('/user/another',isLoggedIn, function(req, res) {
		res.send(moment().format('MMMM Do YYYY, h:mm:ss a'));
		var date = moment();
		res.send(date.toISOString());
		//date.toISOString(); // or format() - see below
		//res.render('another.ejs', {});
	});
	
}
