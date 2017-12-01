const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars");
const config = require('./config/config');

// Requiring our models for syncing
const db = require("./models");

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
const app = express();
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
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes')

// Verifies the cookie which have the JWT token embedded
// All secure routes will use /members route prefix
app.use('/members', jwtExp({
    secret: token,
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

app.use('/members', userRoues);

// Verify authorization using express-jwt
app.use('/api', function (req, res) {
  jwtExp({ secret: token });
  next();
});

app.use('/api', apiRoutes);

app.use(express.static('./public'));

app.get('/', function (req, res) {
  res.render('index')
})

db.sequelize.sync({ force: false })
  .then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});
