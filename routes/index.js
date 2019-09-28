var express = require('express');
var router = express.Router();

var middleware= () => {
  return function (req, res, next) {
    if (!req.cookies.user_sid || !req.session.user) {
      res.redirect('/login');
    } else {
      next();
    }
  };
};


module.exports = (app) => {
  // const users = require('../controllers/user_controller');
  app.get('/',middleware() ,function(req, res, next) {
    res.render('index', { title: 'Express' ,email : req.session.user.email});
  });
};

module.exports = (app) => {
  const TODO = require('../controllers/to-do-list');

  // Create a new Note
  app.get('/',middleware(), TODO.findAll);
  app.get('/:id',middleware(), TODO.findOne);
};
