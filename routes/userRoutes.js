const authentication =  require('../controllers/authenticationController');
const router = require('express').Router();

// app.get('members/:id', function (req, res) {
//   const condition = req.params.id;
// });

router.get('/profile', function(req, res) {
// render HTML page
// req.user contains your payload from token
    res.render('members', { user: req.user });
});

router.get('/api', function(req, res) {
// query your database
// send json data
    res.status(200).json({ data: data });
});

module.exports = router;
