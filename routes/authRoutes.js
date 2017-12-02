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
   res.render('chat');
});

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });


app.get('/feedback', function (req, res) {
  res.render('feedback')
})
  // TODO validate that username has no spaces or special character besides
  // a-z, A-Z, 0-9, - or _

  // POST route for creating a new user
  app.post('/register',
    authentication.passwordMatch,
    authentication.register);

  // POST route for logging in the user
  app.post('/login', authentication.login);
}
