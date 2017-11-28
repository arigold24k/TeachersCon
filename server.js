var express = require("express");
var bodyParser = require("body-parser");

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//var routes = require("./controllers/burgers_controller.js");

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(port, function() {
	console.log(`Server is listening on port ${port}`);
});
