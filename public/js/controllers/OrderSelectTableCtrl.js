angular.module('OrderSelectTableCtrl', ['OrderService']).controller('OrderSelectTableController', function($scope, $http, $rootScope, orderService){

  var currentOrder = orderService.getCurrentOrder();
  $scope.tables = {};

  $scope.listAvaliableTables = function(){
    $http.get('/api/table/listAvaliableTables', {headers: $rootScope.tokenHeader}).success(function(res){
      console.log(res);
      $scope.tableList = res;

      if(currentOrder.tables && currentOrder.tables.lenght > 0){
         $scope.tableList.concat(currentOrder.tables);
      }

    }).error(function(res){
      console.log(res);
    });
  };

  $scope.listAvaliableTables();
});
