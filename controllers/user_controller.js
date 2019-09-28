const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.getLogin = (req, res) => {
    res.render('login', { title: 'Welcome To login Page' });
};

module.exports.PostLogin = (req, res) => {
    var email = req.body.email,
        password = req.body.password;
    User.findOne({email:email})
        .then(user => {
            if(!user) {
                console.log("Hi");
                return res.redirect('/login');
            }
            else{
                bcrypt.compare(password, user.password, function(err, resp) {
                    if(resp==true){
                        console.log(user);
                        req.session.user = user;
                        return res.redirect('/');
                    }
                    else{
                        console.log("Hello");
                        return res.redirect('/login');
                    }
                });
            }
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Task with id " + req.params.id
        });
    });
};

module.exports.getSignup = (req, res) => {
    res.render('register', { title: 'Welcome To registration Page' });
};
module.exports.PostSignup = (req, res) => {
    User.findOne({email:req.body.email})
        .then(user => {
            if(!user) {

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        const user = new User({
                            email: req.body.email,
                            password: hash,
                        });
                        user.save()
                            .then(user => {
                                console.log("user "+JSON.stringify(user));
                                return res.redirect('/login');
                            }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Task."
                            });
                        });
                    });
                });

            }
            else{
                console.log("HIIIII");
                return res.redirect('/register');
            }
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Task with id " + req.params.id
        });
    });

};