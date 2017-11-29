const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');

// Requiring our models for syncing
const db = require("./models");

var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static('./public'));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require('./routes/authRoutes')(app);
require('./routes/htmlRoutes')(app);

const routes = require('./routes/appRoutes')

//var routes = require("./controllers/burgers_controller.js");

app.get('/', function (req, res) {
  res.render('index')
})

const PORT = config.port;
db.sequelize.sync({ force: false })
  .then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});
