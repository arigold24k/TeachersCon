var express = require('express');
var methodOverride = require('method-override');

var app = express();
var PORT = process.env.PORT || 8080; 


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({  extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


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

// Using handlebars to render index.html
app.get("/", function(req, res) {
	connection.query("SELECT * FROM Teachers;", function(err, data) {
		if (err) {
			return res.status(500).end();
		}
		res.render("index", { Teachers: data });
	});
});

// Create or Post [CRUD]
app.post("/Teachers", function(req, res) {
	connection.query("INSERT INTO Teachers (TeacherName) VALUES (?)", [req.body.TeacherName], function(err, result) {
		if (err) {
			return res.status(500).end();
		}
		res.json({ id: result.insertId });
		console.log({ id: result.insertId });
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

// Update [CRUD]
app.put("teachers/:ID", function(req, res) {
	connection.query("UPDATE Teachers SET TeacherName = ? WHERE ID = ?", 
	[req.body.TeacherName, req.params.id], function(err, result) {
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
	[req.params.id], function(err, result) {
		if (err) {
			return res.status(500).end();
		} else if (result.affectedRows == 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});

// Using controller.js instead of the code above //
// var routes = require('./controllers/controller.js');
// app.use('/', routes);
// app.use('/create', routes);
// app.use('/update', routes);
// app.use('/delete', routes);

app.listen(PORT, function() {
  console.log("Listening on PORT: " + PORT);
});
