const Task = require('../models/task');
const User = require('../models/user');


exports.Logout = (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log("sdf");
        res.clearCookie('user_sid');
    }
    res.redirect('/login');
};

exports.findAll = (req, res) => {

    User.findOne({email: req.session.user.email})
        .populate('tasks')
        .then(user => {
            // Stores with items
            console.log(user.tasks);
            res.render('tasks', {title: 'Welcome To your To-do-List', tasks: user.tasks,req:req});
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Tasks."
        });
    });
};
exports.findOne = (req, res) => {
    Task.findById(req.params.id)
        .populate('user')
        .then(task => {
            // Stores with items
            if(!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.id
                });
            }
            res.render('task', {title: 'Welcome To your To-do-List', task: task,req:req});
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Tasks."
        });
});
};

exports.create = (req, res) => {
    res.render('create', { title: 'Welcome To your To-do-List',req:req });
};

exports.store = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Task content can not be empty"
        });
    }
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    var user=req.session.user;
    const task = new Task({
        date: year + "-" + month + "-" + date,
        content: req.body.content,
        user: [user._id]
    });

    task.save()
        .then(task => {
            console.log("task "+task);
            user.tasks.push(task._id);
            console.log("user "+JSON.stringify(user));

            User.update({_id : user._id},user)
                .then(data => {
                    req.session.user = user;
                    return res.redirect('/');
                })
                .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving Tasks."
                });
            });
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Task."
        });
    });
};

exports.edit = (req, res) => {
    var user=req.session.user;
    Task.findById(req.params.id)
        .populate('user')
        .then(task => {
            // Stores with items
            console.log("task user id "+task.user[0]._id);
            console.log("session user id "+user._id);
            if(!task || (task && task.user[0]._id!=user._id)) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.id
                });
            }

            res.render('update', { task: task,req:req });

        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Tasks."
        });
    })
};


exports.update = (req, res) => {
    // Validate Request
    var user=req.session.user;

    if(!req.body.content) {
        return res.status(400).send({
            message: "content can not be empty"
        });
    }
    var task={
        content: req.body.content,
    };

    Task.update({_id : req.params.id,user:[user._id]},task)
        .then(data => {
            return res.redirect('/');
        })
        .catch(err => {
            return res.status(404).send({
                message: "Task not found " + req.params.id
            });
        });
};

exports.delete = (req, res) => {
    var user=req.session.user;
    console.log("Before delete "+  user.tasks);
    Task.findByIdAndRemove(req.params.id)
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.id
                });
            }
            user.tasks = user.tasks.filter(item => item !== req.params.id);
            console.log("Before delete "+  user.tasks);

            User.update({_id : user._id},user)
                .then(data => {
                    req.session.user = user;
                    return res.redirect('/');
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving Tasks."
                    });
                });
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Task with id " + req.params.id
        });
    });
};