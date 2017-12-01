const authentication =  require('../controllers/authenticationController');
const router = require('express').Router();

router.get('/profile', function(req, res) {
// render HTML page
// req.member contains the payload from token
    res.render('members', { user: req.member });
});

router.get('/api', function(req, res) {
// query your database
// send json data
    res.status(200).json({ data: data });
});

module.exports = router;
