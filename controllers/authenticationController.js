const bcrypt = require('bcrypt');
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
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          // Store hash in your password db
          db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
          })
          .then(function () {
            res.status(200).redirect('/member');
          })
          .catch(function (err) {
            res.status(400).send({
              'error': 'This username is already taken.'
            });
          });
        });
      }
  })
},
  // TODO validate password matches username in db
  // POST route for user login
  login: function (req, res, next) {
    const {username, password} = req.body
    db.User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then(function (user) {
      if (!user) {
        console.log('No user found');
      }
      res.status(200).redirect('/member');
    })
    .catch(function (err) {
      res.status(400).send({'status': 'Username or password is not valid.'});
    });
  }
}
