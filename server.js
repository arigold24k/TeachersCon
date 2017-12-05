const path = require("path");
const db = require("./models");
const express = require('express');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');

const app = express();
var PORT = process.env.PORT || 8080;
app.use(express.static("public"));

app.use(cookieParser("secretCookie"));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({  extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// app.listen(PORT, function() {
  console.log("Listening on PORT: " + PORT);
// });

const jwt = require('jsonwebtoken');
const jwtExp = require('express-jwt');
const config = require('./config/config');
require('./routes/authRoutes')(app);
require('./routes/userRoutes');
// require('./routes/htmlRoutes')(app);
var memRoutes = require("./routes/memRoutes");
var userRoutes = require('./routes/userRoutes');



var http = require('http').Server(app);
var io = require('socket.io')(http);

// Cookie parser used to sign the cookie
app.get('/members', jwtExp({
    secret: 'secretCookie',
    getToken: function fromCookie(req) {
        if (req.signedCookies) {
            return req.signedCookies.jwtAuthToken;
        }else{
            return null;
        }
    },
    credentialsRequired: false
}), function (req, res, next) {
    // if user is signed-in, next()
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
});
app.use('/members', memRoutes);
app.use('/', userRoutes);

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

