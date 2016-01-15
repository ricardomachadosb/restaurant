module.exports = function(app) {
  var drinkController = app.back.controllers.drinkController;
  var authController = app.back.controllers.authController;

  app.post('/api/drink/create', authController.checkAuth, drinkController.create);
  app.delete('/api/drink/remove/:id',authController.checkAuth,  drinkController.remove);
  app.get('/api/drink/list/:id', authController.checkAuth, drinkController.list);
  app.get('/api/drink/list', authController.checkAuth, drinkController.list);
  app.get('/api/drink/listAvailableDrinks', authController.checkAuth, drinkController.listAvailableDrinks);
  app.get('/api/drink/edit/:id', authController.checkAuth, drinkController.edit);
  app.put('/api/drink/put/:id', authController.checkAuth, drinkController.put);
};
