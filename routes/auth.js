var express = require('express');
var controller = require('../controllers/user_controller');

var router = express.Router();
var middleware=() => {
    return function (req, res, next) {
        if (req.cookies.user_sid && req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
};
router.get('/login',middleware(), controller.getLogin);
router.post('/login',middleware(), controller.PostLogin);
router.post('/register',middleware(), controller.PostSignup);
router.get('/register',middleware(), controller.getSignup);
module.exports = router;


