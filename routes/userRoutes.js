const authentication =  require('../controllers/authenticationController');
const router = require('express').Router();

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/register', function (req, res) {
  res.render('register')
})


router.get('/chat', function (req, res) {
  res.render('chat')
})

router.get('/profile', function (req, res) {
  res.render('members')
})

// Render HTML page and req.member contains the payload from token
router.get('/profile', function(req, res) {
    res.render('members', { user: req.member });
});


module.exports = router;
