angular.module('OrderCtrl', ['OrderService']).controller('OrderController', function($scope, $http, $rootScope, $location, orderService){

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
    $location.path("/pedidos/mesas");
  };

  $scope.edit = function(id){
    orderService.clearCurrentOrder();
    orderService.setCurrentOrder(id);
    $location.path("/pedidos/mesas");
  };

  $scope.formatTablesText = function(order){
    var formatedText = "";
    if(order && order.tables && order.tables.length > 0){
      if(order.tables.length > 1){
        for(var i = 0; i <= order.tables.length - 1; i++){
            if(i == order.tables.length - 1){
              formatedText += order.tables[i].code;
            }else {
              formatedText += (order.tables[i].code + ", ")
            }
        }
      }else {
        formatedText = order.tables[0].code;
      }
    }
    return formatedText;
  };

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
