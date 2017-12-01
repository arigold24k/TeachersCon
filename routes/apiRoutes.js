const authentication =  require('../controllers/authenticationController');
const router = require('express').Router();

router.get('/protected/api/data', function(req, res) {
// query your database
// send json data
    res.status(200).json({ data: data });
});

module.exports = router;
