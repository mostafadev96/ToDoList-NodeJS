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
  app.get('/',middleware(),(req, res)=>{
    TODO.findAll
  });
  app.get('/:id',middleware(),(req, res)=>{
    TODO.findOne
  });
  app.get('/tasks/create',middleware(),(req, res)=>{
    TODO.create
  } );
  app.get('/tasks/edit/:id',middleware(),(req, res)=>{
    TODO.edit
  } );
  app.post('/store',middleware(),(req, res)=>{
    TODO.store
  } );

  app.put('/:id',middleware(),(req, res)=>{
    TODO.update
  } );

  app.delete('/:id',middleware(),(req, res)=>{
    TODO.delete
  } );
  app.get('/logout',middleware(),(req, res)=>{
    TODO.Logout
  } );

};
