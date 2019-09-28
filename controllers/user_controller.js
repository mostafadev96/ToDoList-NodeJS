const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('login', { title: 'Welcome To login Page' });
};

exports.PostLogin = (req, res) => {
    var email = req.body.email,
        password = req.body.password;
    User.findOne({email:email})
        .then(user => {
            if(!user) {
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
                        return res.redirect('/login');
                    }
                });
            }
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};