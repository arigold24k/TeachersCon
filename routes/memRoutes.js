const authentication =  require('../controllers/authenticationController');
const router = require('express').Router();
var db=require("../models");


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

router.get('/calendar', function (req, res) {
    res.render('calendar');
});

router.get('/profile', function (req, res) {
    res.render('members');
});

router.get('/feedback', function (req, res) {
    res.render('feedback');
});

router.get('/chat', function (req, res) {
    res.render('chat');
});

router.get('/profile', function(req, res) {
// render HTML page
// req.member contains the payload from token
    res.render('members', { user: req.member });
});

router.get("/reportcard/:email", function(req,res) {
    console.log(req.params.email);

    db.Parents.findOne({
        where: {
            email: req.params.email
        }
    }).then(function(response) {
        console.log(response.dataValues.id);
        db.Parents.findOne({
            include: [{
                model: db.Grades,
                where: {ParentId: response.dataValues.id}
            }]
        }).done(function(data) {
            console.log("this is the response from the left join", data);
            console.log("this is the grades", data.dataValues.Grades[0].dataValues);
            var average = ((Number(data.dataValues.Grades[0].dataValues.math) + Number(data.dataValues.Grades[0].dataValues.reading) + Number(data.dataValues.Grades[0].dataValues.socialstudies) + Number(data.dataValues.Grades[0].dataValues.science))/ 4);
            var hbsObject = {
                    name: data.dataValues.Grades[0].dataValues.username,
                    math: data.dataValues.Grades[0].dataValues.math,
                    reading: data.dataValues.Grades[0].dataValues.reading,
                    socialstudies: data.dataValues.Grades[0].dataValues.socialstudies,
                    science: data.dataValues.Grades[0].dataValues.science,
                    average: average
                };

            res.json(hbsObject);
        })
    })

});

router.get("/reportcard", function(req, res) {
//call function from teacherorm
    console.log(req);
    // parent.retrieve(req.body.email, function (data) {
    //     console.log(data);
    //     var hbsObject;
    //     // if(data === undefined) {
    //     //     console.log("no data");
    //     //
    //     //     hbsObject = {
    //     //         name: "No Name",
    //     //         math: "N/A",
    //     //         reading: "N/A",
    //     //         socialstudies: "N/A",
    //     //         science: "N/A",
    //     //         average: "N/A"
    //     //     };
    //     //
    //     // }else {
    //     //     console.log(data);
    //     //     var average = ((Number(data[0].math) + Number(data[0].reading) + Number(data[0].socialstudies) + Number(data[0].science))/ 4);
    //     //     hbsObject = {
    //     //         name: data[0].username,
    //     //         math: data[0].math,
    //     //         reading: data[0].reading,
    //     //         socialstudies: data[0].socialstudies,
    //     //         science: data[0].science,
    //     //         average: average
    //     //     };
    //     //     console.log(data);
    //     //     console.log(hbsObject);
    //     // }
    //
    // });
    res.render("reportcard");
});

module.exports = router;

