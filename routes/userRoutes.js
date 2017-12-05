const authentication =  require('../controllers/authenticationController');

const jwt = require('jsonwebtoken');
const jwtExp = require('express-jwt');

const router = require('express').Router();

router.get('/', function(req, res) {
    res.render('index')
});

router.get('/register', function (req, res) {
  res.render('register')
});


router.get("/reportcard", function(req, res) {
//call function from teacherorm


});

// router.get('/members', function (req, res) {
//     res.render('members', { user: "tst" });
// });

router.get('/chat', function (req, res) {
  res.render('chat')
});


// router.get('/members', jwtExp({
//     secret: 'secretCookie',
//     getToken: function fromCookie(req) {
//         if (req.signedCookies) {
//             return req.signedCookies.jwtAuthToken;
//         }else{
//             return null;
//         }
//     },
//     credentialsRequired: false
// }), function (req, res, next) {
//     // if user is signed-in, next()
//     if (req.user) {
//         next();
//     } else {
//         res.redirect('/login');
//     }
// });
// router.get('/profile', function (req, res) {
//   res.render('members')
// });

// Render HTML page and req.member contains the payload from token
// router.get('/profile', function(req, res) {
//     res.render('members', { user: req.member });
// });


module.exports = router;
