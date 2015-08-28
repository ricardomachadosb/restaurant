module.exports = function(app) {
  var userController = app.back.controllers.userController;
  var authController = app.back.controllers.authController;

  app.get('/api/user/setup', userController.setup);
  app.post('/api/user/create', userController.create);
  app.post('/api/user/remove', userController.remove);
  app.get('/api/user/list', authController.checkAuth, userController.list);
};