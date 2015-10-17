
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

  $scope.add = function(){
    $http.post('/api/drink/create', $scope.drink, {headers: $rootScope.tokenHeader}).success(

      function(res){
        $scope.drink = "";
        $scope.list();

        $scope.messageClass = 'alert-success';
        $scope.message = 'Bebida cadastrada';
      }
    ).error(function(res){
      $scope.messageClass = 'alert-danger';
      $scope.message = 'Problemas ao cadastrar bebida';
    });
  };

  $scope.remove = function( id ){
    $http.delete('/api/drink/remove/' + id, {headers: $rootScope.tokenHeader}).success(

      function(res){
          if(res.success){
            $scope.drink = "";
            $scope.list();

            $scope.messageClass = 'alert-success';
            $scope.message = 'Bebida deletada';
        }else {
          $scope.messageClass = 'alert-danger';
          $scope.message = res.message ? res.message : 'Problemas ao deletar Bebida';
        }
      }
    ).error(function(res){
      $scope.messageClass = 'alert-danger';
      $scope.message = 'Problemas ao deletar Bebida';
    });
  };

  $scope.list();

});