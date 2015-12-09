module.exports = function(app) {
  var orderController = app.back.controllers.orderController;
  var authController = app.back.controllers.authController;

 // app.post('/api/order/create', authController.checkAuth, orderController.create);
  //app.delete('/api/order/remove/:id',authController.checkAuth,  orderController.remove);
  //app.get('/api/order/list/:id', authController.checkAuth, orderController.list);
  //app.get('/api/order/edit/:id', authController.checkAuth, orderController.edit);
  //app.put('/api/order/put/:id', authController.checkAuth, orderController.put);
};
