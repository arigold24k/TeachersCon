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

// Using Handlebars to render index.html
//dont need this to render
// app.get("/", function(req, res) {
// 	connection.query("SELECT * FROM Teachers;", function(err, data) {
// 		if (err) {
// 			return res.status(500).end();
// 		}
// 		res.render("index", { Teachers: data });
// 	});
// });



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

app.use("/", routes);
app.use("/Teachers", teacherRoutes);

// Routes for authentication and member pages
require('./routes/authRoutes')(app);
require('./routes/htmlRoutes')(app);
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes')

// Verifies the cookie which have the JWT token embedded
// All secure routes will use /members route prefix
app.use('/members', jwtExp({
    secret: 'secrettoken',
    getToken: function fromCookie(req) {
        if (req.signedCookies) {
          // Returns cookie to secure middleware
            return req.signedCookies.token;
            next();
        }
        // Returns null which creates an error
        return null;
    }
}));

app.use('/members', userRoutes);

// Verify authorization using express-jwt
app.use('/api', function (req, res) {
  jwtExp({ secret: token });
  next();
});
app.use('/api', apiRoutes);

app.get('/', function(req, res) {
    res.render('index')
});

db.sequelize.sync({ force: true })
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

