module.exports = function(app){
	//新增一筆schedule
	app.post('/api/schedule', function(req, res) {
		res.json({
			id:req.body.inputSchedule
			});
	});
	
}