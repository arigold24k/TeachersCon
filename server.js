var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var port = process.env.PORT || 3000;

var db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));


var routes = require("./controllers/teachercon_controller.js");

app.use("/", routes);

db.sequelize.sync({}).then(function() {
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
    });
});