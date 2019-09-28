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

    // Create a new Note
    app.get('/login',middleware(), users.getLogin);
    app.post('/login',middleware(), users.PostLogin);
};
