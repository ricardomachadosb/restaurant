module.exports = function(app) {
  var dishController = app.back.controllers.dishController;
  var authController = app.back.controllers.authController;

  app.post('/api/dish/create', authController.checkAuth, dishController.create);
  app.delete('/api/dish/remove/:id',authController.checkAuth,  dishController.remove);
  app.get('/api/dish/list', authController.checkAuth, dishController.list);
  app.get('/api/dish/edit/:id', authController.checkAuth, dishController.edit);
  app.put('/api/dish/put/:id', authController.checkAuth, dishController.put);
};