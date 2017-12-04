const path = require('path');

module.exports = function (app) {

  app.get('/register', function (req, res) {
    res.render('register');
  });

  app.get('/login', function(req, res) {
    res.render('index');
  });


};
