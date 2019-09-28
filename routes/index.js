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
  const TODO = require('../controllers/to-do-list');
  app.get('/',middleware(), TODO.findAll);
  app.get('/:id',middleware(), TODO.findOne);
  app.get('/tasks/create',middleware(), TODO.create);
  app.get('/tasks/edit/:id',middleware(), TODO.edit);
  app.post('/store',middleware(), TODO.store);

  app.put('/:id',middleware(), TODO.update);

  app.delete('/:id',middleware(), TODO.delete);
  app.get('/logout',middleware(), TODO.Logout);

};
