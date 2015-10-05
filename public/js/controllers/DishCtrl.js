
angular.module('DishCtrl', []).controller('DishController', function($scope, $http, $rootScope){

  $scope.currencyPattern= "^([0-9]{1,3}|100)([,.][0-9]{1,2})?$"
  $scope.numberOnlyPattern= "^[0-9]{1,3}$"

  $scope.list = function(){
    $scope.dish = "";
    $http.get('/api/dish/list', {headers: $rootScope.tokenHeader}).success(function(res){
      $scope.dishList = res;
    }).error(function(res){
      console.log(res);
    });
  };

  $scope.new = function(){
    $scope.dish = "";
  };

  $scope.list();
});