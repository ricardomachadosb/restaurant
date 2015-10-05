
angular.module('DrinkCtrl', []).controller('DrinkController', function($scope, $http, $rootScope){

  $scope.currencyPattern= "^([0-9]{1,3}|100)([,.][0-9]{1,2})?$"
  $scope.numberOnlyPattern= "^[0-9]{1,3}$"

  $scope.list = function(){
    $scope.drink = "";
    $http.get('/api/drink/list', {headers: $rootScope.tokenHeader}).success(function(res){
      $scope.drinkList = res;
    }).error(function(res){
      console.log(res);
    });
  };

  $scope.new = function(){
    $scope.drink = "";
  };

  $scope.list();

});