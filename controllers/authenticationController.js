const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('../models');

module.exports = {
  passwordMatch: function (req, res, next) {
    if (req.body.password === req.body.passwordMatch) {
      next();
    } else {
      res.status(401).send('The password you have entered does not match.');
    }
  },
  register: function (req, res) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        res.send({
          status: 'Unable to create account.',
          error: err
        })
      } else {
        // Hashes the password before it is stored int the database
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
          })
          .then(function () {
            res.status(200).redirect('/members');
          })
          .catch(function (err) {
            // Re-render registration page in order to send status to front end.
            res.status(401).render('register', {status: 'Unable to create user with info provided.'});
            // res.status(400).send({
            //   'error': 'This username is already taken.'
            // });
          });
        });
      }
  })
},
  // POST route for user login
  login: function (req, res, next) {
    // Finds user
    const {id, username, email, password} = req.body;
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(function (user) {
      // Checks for user in database
      if (!user) {
        res.render('login', {status: 'Username or password is incorrect.'})
      }
      // Checks if password matches
      if (user.password !== req.body.password) {
       res.render('login', {status: 'Username or password is incorrect.' });
     }

     // User info that will be embedded into the token
      const data = {
      id: req.body.id,
      username: req.body.username,
      email: req.body.email
      }

      // Embeddes member object into token
      const token = jwt.sign(data, 'secret', {expiresIn: '10h'}, function (err, token) {
        if (err) res.json(err);
        res.cookie('token', token, {
          secure: process.env.NODE_ENV === 'production',
          signed: true
        });

        res.json({
           message: 'Authenticated! Use this token in the "Authorization" header',
           token: token
         });

        // redirect user to secure route
        res.redirect('/members')
      }, 'secretcookie');

    })
    .catch(function (err) {
      res.status(400).send({'status': 'Username or password is not valid.'});
    });
  }
}
