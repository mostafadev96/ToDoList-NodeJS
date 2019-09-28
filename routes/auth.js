var express = require('express');
var router = express.Router();
var User = require('./../models/user.js');

var middleware=() => {
    return function (req, res, next) {
        if (req.cookies.user_sid && req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
};


module.exports = (app) => {
    const users = require('../controllers/user_controller');

    app.get('/login',middleware(), users.getLogin);
    app.post('/login',middleware(), users.PostLogin);
    app.post('/register',middleware(), users.PostSignup);
    app.get('/register',middleware(), users.getSignup);
};
