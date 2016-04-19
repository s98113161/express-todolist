var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

router.post('/login',
  passport.authenticate('local', {session:false}),
   function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  }
);
module.exports = router;