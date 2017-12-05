const authentication =  require('../controllers/authenticationController');
const router = require('express').Router();
var parent = require("../fucntions/parent");

router.get('/', function (req, res) {
    console.log(req.user);
    res.render('members', {name: req.user.data.username});
});

// router.get('/reportcard', function (req, res) {
//     console.log(req);
//     res.render('reportcard');
// });


router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/profile', function (req, res) {
    res.render('members');
});

router.get('/chat', function (req, res) {
    res.render('chat');
});

router.get('/profile', function(req, res) {
// render HTML page
// req.member contains the payload from token
    res.render('members', { user: req.member });
});



router.get("/reportcard", function(req, res) {
//call function from teacherorm
    console.log(req);
    parent.retrieve(req.body.email, function (data) {
        console.log(data);
        var hbsObject;
        if(data === undefined) {
            console.log("no data");

            hbsObject = {
                name: "No Name",
                math: "N/A",
                reading: "N/A",
                socialstudies: "N/A",
                science: "N/A",
                average: "N/A"
            };

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
        }
        res.render("reportcard", hbsObject);
    });

});

module.exports = router;

