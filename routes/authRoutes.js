const authentication = require('../controllers/authenticationController');

module.exports = function(app) {

  app.get('/', function (req, res) {
    res.status(200).json('User login page pending...');
  });

  // TODO validate that username has no spaces or special character besides
  // a-z, A-Z, 0-9, - or _

  // POST route for creating a new user
  app.post('/register',
    authentication.passwordMatch,
    authentication.register);

  // POST route for logging in the user
  app.post('/login', authentication.login);
}
