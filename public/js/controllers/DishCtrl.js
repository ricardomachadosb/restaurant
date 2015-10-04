
angular.module('DishCtrl', []).controller('DishController', function($scope, $http, $rootScope){

  $scope.list = function(){
    $scope.dish = "";
    $http.get('/api/dish/list', {headers: $rootScope.tokenHeader}).success(function(res){
      $scope.dishList = res;
    }).error(function(res){
      console.log(res);
    });
  };

  $scope.list();
});