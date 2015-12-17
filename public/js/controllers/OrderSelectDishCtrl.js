
angular.module('OrderSelectDishCtrl', ['OrderService']).controller('OrderSelectDishController', function($scope, $http, $rootScope, orderService){

  $scope.listDish = function(){
    $http.get('/api/dish/list', {headers: $rootScope.tokenHeader}).success(function(res){
      $scope.dishList = res;
    }).error(function(res){
      console.log(res);
    });
  };

  $scope.listDish();

});