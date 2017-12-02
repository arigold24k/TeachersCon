const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

var port = process.env.PORT || 3000;

const db = require("./models");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/teachercon_controller.js");

app.use("/", routes);

db.sequelize.sync({}).then(function() {
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
    });
});