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
                console.log('err', err);
                res.render('register', {
                    status: 'Unable to create account.',
                    error: err
                })
            } else {
                // Hashes the password before it is stored int the database
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    db.Parents.create({
                        username: req.body.username,
                        email: req.body.email,
                        address: req.body.address,
                        phoneNumber: req.body.phoneNumber,
                        password: hash,

                    })
                        .then(function (data) {
                            console.log("this is the data from the first call", data);
                            var classname;
                            if(req.body.classID === 1) {
                                classname = "A"
                            }else {
                                classname= "B"
                            }


                            db.Student.create({
                                username: req.body.childname,
                                email: req.body.childemail,
                                classroom: classname,
                                ClassroomId: req.body.classid,
                                ParentId: data.dataValues.id

                            }).then(function(data1) {
                                console.log(data1);
                            });
                            res.redirect('/');
                        })
                        .catch(function (err) {
                            console.log(err);
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
        }).then(function (user) {
                // Checks for user in database
                console.log("this is the log", user.dataValues.id);
            if (!user) {
                res.render('index', {'status': 'Username or password is incorrect.'});
            } else {
                // Load hash from your password DB.
                let passCheck = bcrypt.compareSync(req.body.password, user.password); // true

                if (!passCheck) {
                    res.render('index', {'status': 'Username or password is incorrect.'})
                } else {

                    // User info that will be embedded into the token
                    const data = {
                        id: user.dataValues.id,
                        username: user.dataValues.username,
                        email: user.dataValues.email,
                    };
                    console.log(data);
                    // TODO add admin flag
                    // Embeddes member object into token
                    // create JWT token
                    var jwtAuthToken = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: {
                            id: user.id,
                            username: user.username,
                            email: user.email
                        }
                    }, 'secretCookie');
                    // Create a cookie embedding JWT token
                    res.cookie('jwtAuthToken', jwtAuthToken, {
                        secure: process.env.NODE_ENV === 'production',
                        signed: true
                    });
                    // redirect user to secure app
                    res.redirect('/members');
                }
            }
            }).catch(function (err) {
            console.log(err)
            //res.status(400).send({ 'status': 'Username or password is not valid.' });
        });
    },

};
module.exports = exp;
