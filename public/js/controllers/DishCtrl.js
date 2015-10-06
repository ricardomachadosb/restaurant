
angular.module('DishCtrl', []).controller('DishController', function($scope, $http, $rootScope){

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

  $scope.add = function(){
    $http.post('/api/dish/create', $scope.dish, {headers: $rootScope.tokenHeader}).success(

      function(res){
        $scope.dish = "";
        $scope.list();

        $scope.messageClass = 'alert-success';
        $scope.message = 'Prato cadastrado';
      }
    ).error(function(res){
      $scope.messageClass = 'alert-danger';
      $scope.message = 'Problemas ao cadastrar prato';
    });
  };

  $scope.list();
});