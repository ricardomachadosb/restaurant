module.exports = function(app) {
  var authController = app.back.controllers.authController;
  app.post('/api/authenticate', authController.authenticate);
};