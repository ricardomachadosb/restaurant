module.exports = function(app) {
  var orderController = app.back.controllers.orderController;
  var authController = app.back.controllers.authController;

 app.post('/api/order/generateOrder', authController.checkAuth, orderController.generateOrder);
 app.delete('/api/order/remove/:id',authController.checkAuth,  orderController.remove);
 app.get('/api/order/list', authController.checkAuth, orderController.list);
 app.get('/api/order/listOrderInProgress', authController.checkAuth, orderController.listOrderInProgress);
 app.get('/api/order/get/:id', authController.checkAuth, orderController.get);
 app.get('/api/order/count', authController.checkAuth, orderController.count);
 app.put('/api/order/put/:id', authController.checkAuth, orderController.put);
 app.get('/api/order/setup', orderController.setup);
 //app.get('/api/order/edit/:id', authController.checkAuth, orderController.edit);
 //app.put('/api/order/put/:id', authController.checkAuth, orderController.put);
};
