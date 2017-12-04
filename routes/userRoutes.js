const authentication =  require('../controllers/authenticationController');
var parent = require("../fucntions/parent");


const router = require('express').Router();

router.get('/', function(req, res) {
    res.render('index')
});

router.get('/members', function (req, res) {
    res.render('members', { user: req.member });
});

router.get('/register', function (req, res) {
  res.render('register')
});


router.get("/reportcard", function(req, res) {
//call function from teacherorm
    parent.retrieve(function (data) {
        var hbsObject;
        if(data[0] === undefined) {
            console.log("no data");
            res.render("reportcard");
        }else {
            console.log(data);
            var average = ((Number(data[0].math) + Number(data[0].reading) + Number(data[0].socialstudies) + Number(data[0].science))/ 4);
            hbsObject = {
                name: data[0].username,
                math: data[0].math,
                reading: data[0].reading,
                socialstudies: data[0].socialstudies,
                science: data[0].science,
                average: average
            };
            console.log(data);
            console.log(hbsObject);
            res.render("reportcard", hbsObject);
        }
    });

});

router.get('/chat', function (req, res) {
  res.render('chat')
});

// router.get('/profile', function (req, res) {
//   res.render('members')
// });

// Render HTML page and req.member contains the payload from token
// router.get('/profile', function(req, res) {
//     res.render('members', { user: req.member });
// });


module.exports = router;
