const authentication =  require('../controllers/authenticationController');
const router = require('express').Router();

router.get('/', function (req, res) {
  res.render('members')
})

router.get('/register', function (req, res) {
  res.render('register')
})

router.get('/profile', function (req, res) {
  res.render('members')
})

router.get('/chat', function (req, res) {
  res.render('chat')
})

router.get('/profile', function(req, res) {
// render HTML page
// req.member contains the payload from token
    res.render('members', { user: req.member });
});

module.exports = router;
