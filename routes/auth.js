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

    app.get('/login',middleware(), (req,res)=>{users.getLogin});
    app.post('/login',middleware(), (req,res)=>{users.PostLogin});
    app.post('/register',middleware(), (req,res)=>{users.PostSignup});
    app.get('/register',middleware(), (req,res)=>{users.getSignup});
};
