const path = require("path");
const db = require("./models");
var express = require('express');
var methodOverride = require('method-override');

const app = express();
var PORT = process.env.PORT || 8080; 
app.use(express.static("public"));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({  extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(PORT, function() {
  console.log("Listening on PORT: " + PORT);
});
const express = require('express');
const jwt = require('jsonwebtoken');
const jwtExp = require('express-jwt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars");
const config = require('./config/config');

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Cookie parser used to sign the cookie
app.use(cookieParser('secretcookie'));

var routes = require("./controllers/teachercon_controller.js");
var teacherRoutes = require("./controllers/teacher_controller.js")

app.use("/members/reportcard", routes);
app.use("/Teachers", teacherRoutes);

// Routes for authentication and member pages
require('./routes/authRoutes')(app);
require('./routes/htmlRoutes')(app);
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes')

// Verifies the cookie which have the JWT token embedded
// All secure routes will use /members route prefix

app.get('/', jwtExp({
  secret: 'secretCookie',
  getToken: function fromCookie(req) {
    if (req.signedCookies) {
      return req.signedCookies.token;
    }
    return null;
  },
  credentialsRequired: false
}), function (req, res, next) {
  // if user is signed-in, next()
  if (req.user) {
    next();
  } else {
    res.redirect('/members');
  }
});

app.use('/members', userRoutes);

db.sequelize.sync({ force: false })

    .then(function() {
        http.listen(PORT, function() {
            console.log('http listening on *:3000');
        });
    });

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        // when the client emits 'new message', this listens and executes
        io.emit('chat received', msg);
    });
});

