var express = require("express");

var router = express.Router();

var teacher = require("../fucntions/teacher.js");

// Import the model (cat.js) to use its database functions.
// var teacherorm = require("../models/teacherorm.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
//call function from teacherorm
        console.log(hbsObject);
        res.render("index", hbsObject);
    });

router.post("/api/burgers", function(req, res) {
    //call function to post data/ create new data
});

router.put("/api/burgers/:id", function(req, res) {
    //used to update data
    // var condition = "id = " + req.params.id;
    //
    // console.log("condition", condition);
    //
    // burger.update({
    //     devoured: req.body.devoured
    // }, condition, function(result) {
    //     if (result.changedRows == 0) {
    //         // If no rows were changed, then the ID must not exist, so 404
    //         return res.status(404).end();
    //     } else {
    //         res.status(200).end();
    //     }
    // });
});

// Export routes for server.js to use.
module.exports = router;