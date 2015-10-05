
angular.module('DrinkCtrl', []).controller('DrinkController', function($scope, $http, $rootScope){

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