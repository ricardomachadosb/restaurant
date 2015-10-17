module.exports = function(app) {
  var drinkController = app.back.controllers.drinkController;
  var authController = app.back.controllers.authController;

  app.post('/api/drink/create', authController.checkAuth, drinkController.create);
  app.delete('/api/drink/remove/:id',authController.checkAuth,  drinkController.remove);
  app.get('/api/drink/list', authController.checkAuth, drinkController.list);
  //app.get('/api/dish/edit/:id', authController.checkAuth, dishController.edit);
  //app.put('/api/dish/put/:id', authController.checkAuth, dishController.put);
};