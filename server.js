var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');

var app = express();

var PORT = process.env.PORT || 8080; 

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/controller.js');
app.use('/', routes);
// app.use('/create', routes);
// app.use('/update', routes);
// app.use('/delete', routes);

app.listen(PORT, function() {
  console.log("Listening on PORT: " + PORT);
});