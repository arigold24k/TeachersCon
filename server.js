const express = require('express');
const jwt = require('jsonwebtoken');
const jwtExp = require('express-jwt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars");
const config = require('./config/config');

// Requiring our models for syncing
const db = require("./models");

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Cookie parser used to sign the cookie
app.use(cookieParser('secretcookie'));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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

app.use(express.static('./public'));

app.get('/', function(req, res) {
    res.render('index')
})

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
