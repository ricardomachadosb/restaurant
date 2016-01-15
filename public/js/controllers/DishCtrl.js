
angular.module('DishCtrl', ['ImageService']).controller('DishController', function($scope, $http, $rootScope, fileReader){

  $scope.list = function(){
    $scope.dish = "";
    $http.get('/api/dish/list', {headers: $rootScope.tokenHeader}).success(function(res){
      $scope.dishList = res;
    }).error(function(res){
      console.log(res);
    });
  };

  $scope.new = function(){
    $scope.dish = {};
  };

  $scope.add = function(){
    $http.post('/api/dish/create', $scope.dish, {headers: $rootScope.tokenHeader}).success(

      function(res){
        if(res.success){
          $scope.dish = "";
          $scope.list();

          $scope.messageClass = 'alert-success';
          $scope.message = 'Prato cadastrado';
        }else {
           $scope.messageClass = 'alert-danger';
           $scope.message = res.message;
        }
      }
    ).error(function(res){
      $scope.messageClass = 'alert-danger';
      $scope.message = 'Problemas ao cadastrar prato';
    });
  };

  $scope.remove = function( id ){
    $http.delete('/api/dish/remove/' + id, {headers: $rootScope.tokenHeader}).success(

      function(res){
          if(res.success){
            $scope.dish = "";
            $scope.list();

            $scope.messageClass = 'alert-success';
            $scope.message = 'Prato deletado';
        }else {
          $scope.messageClass = 'alert-danger';
          $scope.message = res.message ? res.message : 'Problemas ao deletar Prato';
        }
      }
    ).error(function(res){
      $scope.messageClass = 'alert-danger';
      $scope.message = 'Problemas ao deletar Prato';
    });
  };

  $scope.edit = function(e){
    $http.get('/api/dish/edit/' + e, {headers: $rootScope.tokenHeader}).success(function(res){
      $scope.dish = res;
    });
  };

  $scope.put = function(id){
    $http.put('/api/dish/put/' + id, $scope.dish, {headers: $rootScope.tokenHeader}).success(

      function(res){
        $scope.dish = "";
        $scope.list();

        $scope.messageClass = 'alert-success';
        $scope.message = 'Prato alterado';
      }
    ).error(function(res){
      $scope.messageClass = 'alert-danger';
      $scope.message = 'Problemas ao editar prato';
    });
  };

  $scope.getFile = function () {
    $scope.progress = 0;
    fileReader.readAsDataUrl($scope.file, $scope)
    .then(function(result) {
      $scope.dish.picture = [result];
    });
  };

  $scope.$on("fileProgress", function(e, progress) {
    $scope.progress = progress.loaded / progress.total;
  });

  $scope.list();
});