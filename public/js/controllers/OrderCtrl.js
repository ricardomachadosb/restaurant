

angular.module('OrderCtrl', []).controller('OrderController', function($scope, $http, $rootScope, fileReader){

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

  $scope.firstStep = function(){
    $scope.table = {};
    $http.get('/api/table/list/' + $scope.currentPage, {headers: $rootScope.tokenHeader}).success(function(res){
      console.log(res);
      $scope.tableList = res;
    }).error(function(res){
      console.log(res);
    });
  };

  $scope.addTableToOrder = function(id){
     $http.get('/api/table/get/' + e, {headers: $rootScope.tokenHeader}).success(function(res){

        if(res.order != null){

        }

     });
  },

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
