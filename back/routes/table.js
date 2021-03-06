module.exports = function(app) {
  var tableController = app.back.controllers.tableController;
  var authController = app.back.controllers.authController;

  app.post('/api/table/create', authController.checkAuth, tableController.create);
  app.delete('/api/table/remove/:id',authController.checkAuth,  tableController.remove);
  app.get('/api/table/list/:id', authController.checkAuth, tableController.list);
  app.get('/api/table/get/:id', authController.checkAuth, tableController.get);
  app.put('/api/table/put/:id', authController.checkAuth, tableController.put);
  app.get('/api/table/listAvaliableTables', authController.checkAuth, tableController.listAvaliableTables);
  app.post('/api/table/saveAll', authController.checkAuth, tableController.saveAll);
};
