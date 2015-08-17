module.exports = function(app) {
  var userController = app.back.controllers.userController;
  var authController = app.back.controllers.authController;

  app.get('/api/user/setup', userController.setup);
  app.get('/api/user/list', authController.checkAuth, userController.list);
};