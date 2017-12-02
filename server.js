var express = require('express');
var methodOverride = require('method-override');

var app = express();
var PORT = process.env.PORT || 8080; 


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({  extended: false }));
app.use(bodyParser.json());


var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


var mysql = require('mysql');
var connection = mysql.createConnection({
	host:     'localhost',
	user:     'root',
	password: '1234',
	database: 'users_db'
});

connection.connect(function(err) {
	if (err) {
		console.error("Error connecting: " + err.stack);
		return;
	}
	console.log("Connected as id: " + connection.threadId);
});

// Using Handlebars to render index.html
app.get("/", function(req, res) {
	connection.query("SELECT * FROM Teachers;", function(err, data) {
		if (err) {
			return res.status(500).end();
		}
		res.render("index", { Teachers: data });
	});
});

// Read or Retrieve [CRUD]
app.get("/Teachers", function(req, res) {
	connection.query("SELECT * FROM Teachers;", function(err, data) {
		if (err) {
			return res.status(500).end();
		}
		res.json(data);
	});
});

// Create New Teacher [CRUD]
app.post("/Teachers", function(req, res) {
	connection.query("INSERT INTO Teachers (TeacherName) VALUES (?)", [req.body.TeacherName], function(err, result) {
		if (err) {
			return res.status(500).end();
		}
		res.json({ ID: result.insertID });
		console.log({ ID: result.insertID });
	});
});

// Update [CRUD]
app.put("teachers/:ID", function(req, res) {
	connection.query("UPDATE Teachers SET TeacherName = ? WHERE ID = ?", 
	[req.body.TeacherName, req.params.ID], function(err, result) {
		if (err) {
			return res.status(500).end();
		} else if (result.changedRows == 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});

// Delete [CRUD]
app.delete("/Teachers/:ID", function(req, res) {
	connection.query("DELETE FROM Teachers WHERE ID = ?", 
	[req.params.ID], function(err, result) {
		if (err) {
			return res.status(500).end();
		} else if (result.affectedRows == 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});

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

<<<<<<< HEAD
// app.listen(PORT, function() {
//   console.log("App listening on PORT " + PORT);      
// });
  
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg); 
   // when the client emits 'new message', this listens and executes
    io.emit('chat received', msg);
  });
=======
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
>>>>>>> 96cf07e3ab99e1ea4659dd3b6840ca9e2c5d2668
});
