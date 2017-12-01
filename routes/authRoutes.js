const authentication =  require('../controllers/authenticationController');

module.exports = function(app) {

  // POST route for creating a new user
  app.post('/register',
    authentication.passwordMatch,
    authentication.register);

  // POST route for logging in the user
  app.post('/login', authentication.login);
}
