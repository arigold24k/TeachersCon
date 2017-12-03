const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require('../models');

const exp = {
    logout: function (req, res) {
        res.clearCookies('token');
        res.redirect('/');
    },
    passwordMatch: function (req, res, next) {
        if (req.body.passwordMatch && req.body.password !== req.body.passwordMatch) {
            res.status(401).send('The password you have entered does not match.');
        } else {
            next();
        }
    },
    register: function (req, res) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                console.log('err', err)
                res.render('register', {
                    status: 'Unable to create account.',
                    error: err
                })
            } else {
                // Hashes the password before it is stored int the database
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    db.Parents.create({
                        email: req.body.email,
                        password: hash
                    })
                        .then(function () {
                            res.redirect('/login');
                        })
                        .catch(function (err) {
                            console.log(err)
                            // Re-render registration page in order to send status to front end.
                            res.status(401).render('register', {
                                'status': 'Unable to create user with info provided.',
                                error: err
                            });
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
        // const { id, username, email, password } = req.body;
        db.Parents.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(function (user) {
                // Checks for user in database
                if (!user) {
                    res.render('index', {'status': 'email does not match.'/*'Username or password is incorrect.' */})
                } else {
                    // Load hash from your password DB.
                    bcrypt.compare(req.body.password, user.password, function (err, isValid) {
                        // Checks if password matches
                        if (err || !isValid) {
                            res.render('index', {'status': 'password does not match.'/*'Username or password is incorrect.'*/});
                        } else {
                            // User info that will be embedded into the token
                            const data = {
                                id: req.body.id,
                                username: req.body.username,
                                email: req.body.email,
                            };
                            // TODO add admin flag
                            // Embeddes member object into token
                            const token = jwt.sign(data, {expiresIn: '10h'}, function (err, token) {
                                if (err) res.json(err);
                                res.cookie('token', token, {
                                    secure: process.env.NODE_ENV === 'production',
                                    signed: true
                                });

                                // res.json({
                                //     message: 'Authenticated! Use this token in the "Authorization" header',
                                //     token: token
                                // });

                                // redirect user to secure route
                                res.redirect('/members')
                            }, 'secretcookie');
                        }
                    })
                        .catch(function (err) {
                            console.log(err)
                            //res.status(400).send({ 'status': 'Username or password is not valid.' });
                        });
                }
            })
    },
};
module.exports = exp;
