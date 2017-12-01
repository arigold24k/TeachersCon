const authentication =  require('../controllers/authenticationController');

module.exports = function(app) {

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/register', function (req, res) {
  res.render('register')
})

app.get('/members', function (req, res) {
  res.render('members')
})

app.get('/chat', function (req, res) {
  res.render('chat')
})

  // POST route for creating a new user
  app.post('/register',
    authentication.passwordMatch,
    authentication.register);

  // POST route for logging in the user
  app.post('/login', authentication.login);
}
