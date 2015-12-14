angular.module('OrderCtrl', ['OrderService']).controller('OrderController', function($scope, $http, $rootScope, $location, orderService){

  $scope.order = {};

  $scope.list = function(){
    $scope.order = {};
    $http.get('/api/order/list', {headers: $rootScope.tokenHeader}).success(function(res){
      console.log(res);
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

  $scope.remove = function( id ){
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
