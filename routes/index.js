var express = require('express');


var controller = require('../controllers/to-do-list');

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
router.get('/logout',middleware(), controller.Logout);
router.get('/',middleware(), controller.findAll);
router.get('/:id',middleware(), controller.findOne);
router.get('/tasks/create',middleware(), controller.create);
router.get('/tasks/edit/:id',middleware(), controller.edit);
router.post('/store',middleware(), controller.store);
router.put('/:id',middleware(), controller.update);
router.delete('/:id',middleware(), controller.delete);
module.exports = router;