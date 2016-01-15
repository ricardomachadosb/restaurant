module.exports = function(app) {
  var reportController = app.back.controllers.reportController;
  var authController = app.back.controllers.authController;

  app.post('/api/report/generalBilling', authController.checkAuth, reportController.generalBilling);
};
