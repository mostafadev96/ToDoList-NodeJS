const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.findAll = (req, res) => {
    User.findOne({id : req.session.user.id})
        .then(user => {

            res.render('tasks', { title: 'Welcome To your To-do-List' ,user : user});
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};