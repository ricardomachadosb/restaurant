angular.module('OrderCtrl', ['OrderService', 'SocketService']).controller('OrderController', function($scope, $http, $rootScope, $location, orderService, socketService){

  $scope.order = {};

  $scope.list = function(){
    $scope.order = {};
    $http.get('/api/order/list', {headers: $rootScope.tokenHeader}).success(function(res){
      $scope.orderList = res;
    }).error(function(res){
      console.log(res);
    });
  };

  $scope.generateOrder = function(){
    orderService.clearCurrentOrder();
    orderService.generateOrder();
    $location.path("/pedidos/mesas")
  };

  $scope.getOrderStatusText = function(statusCode){
    switch(statusCode){
      case $rootScope.orderStatusCodeNew:
        return "Novo";
        break;
      case $rootScope.orderStatusCodeInProgress:
        return "Em Andamento";
        break;
      case $rootScope.orderStatusCodeClosed:
        return "Entregue";
        break;
      case $rootScope.orderStatusCodePayed:
        return "Pago";
        break;
    }
  }

  $scope.edit = function(id){
    orderService.clearCurrentOrder();
    orderService.setCurrentOrder(id, function(){$location.path("/pedidos/mesas")});
    //$location.path("/pedidos/mesas");
  };

  $scope.closeBill = function(id){
    orderService.clearCurrentOrder();
    orderService.setCurrentOrder(id, function(){$location.path("/pedidos/fechar")});
  }

  var clearTables = function(orderId){
      $http.get('/api/order/get/' + orderId, {headers: $rootScope.tokenHeader}).success(function(res){
          if(res && res.tables && res.tables.length > 0){

            for(var i = 0; i <=  res.tables.length - 1; i++){
              res.tables[i].status = false;
              res.tables[i].orderId = null;

               $http.put('/api/table/put/' + res.tables[i]._id, res.tables[i], {headers: $rootScope.tokenHeader}).success(function(res){}
                  ).error(function(res){
                    $scope.messageClass = 'alert-danger';
                    $scope.message = 'Problemas ao atualizar mesas';
                });
            }
          }

        }).error(function(res){
          console.log(res);
     });
  };

  $scope.remove = function( id ){

    clearTables(id);

    $http.delete('/api/order/remove/' + id, {headers: $rootScope.tokenHeader}).success(

      function(res){
        if(res.success){
          $scope.order = "";
          $scope.list();

          $scope.messageClass = 'alert-success';
          $scope.message = 'Pedido deletado';
          socketService.emit("delete order", null);
        }else {
          $scope.messageClass = 'alert-danger';
          $scope.message = res.message ? res.message : 'Problemas ao deletar Pedido';
        }
      }).error(function(res){
          $scope.messageClass = 'alert-danger';
          $scope.message = 'Problemas ao deletar Pedido';
      });
  };

  $scope.list();
});
