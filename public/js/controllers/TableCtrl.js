
angular.module('TableCtrl', []).controller('TableController', function($scope, $http, $rootScope, fileReader){
  $scope.list = function(){
    $scope.table = {};
    $http.get('/api/table/list/' + $scope.currentPage, {headers: $rootScope.tokenHeader}).success(function(res){
      $scope.tableList = res;
    }).error(function(res){
      console.log(res);
    });
  };

  $scope.new = function(){
    $scope.table = {};
  };

  $scope.add = function(){
    $http.post('/api/table/create', $scope.table, {headers: $rootScope.tokenHeader}).success(
      function(res){
        if(res.success){
          $scope.table = "";
          $scope.currentPage = 0;
          $scope.list();

          $scope.messageClass = 'alert-success';
          $scope.message = 'Mesa cadastrada';
        }else {
          $scope.messageClass = 'alert-danger';
          $scope.message = res.message;
        }
      }
      ).error(function(res){
        $scope.messageClass = 'alert-danger';
        $scope.message = 'Problemas ao cadastrar mesa';
      });
    };

  $scope.remove = function( id ){
    $http.delete('/api/table/remove/' + id, {headers: $rootScope.tokenHeader}).success(

      function(res){
        if(res.success){
          $scope.table = "";
          $scope.list();

          $scope.messageClass = 'alert-success';
          $scope.message = 'Mesa deletada';
        }else {
          $scope.messageClass = 'alert-danger';
          $scope.message = res.message ? res.message : 'Problemas ao deletar Mesa';
        }
      }).error(function(res){
        $scope.messageClass = 'alert-danger';
        $scope.message = 'Problemas ao deletar Mesa';
      });
    };

    $scope.edit = function(e){
      $http.get('/api/table/get/' + e, {headers: $rootScope.tokenHeader}).success(function(res){
        $scope.table = res;
      });
    };

    $scope.put = function(id){
      $http.put('/api/table/put/' + id, $scope.table, {headers: $rootScope.tokenHeader}).success(

        function(res){
          $scope.table = {};
          $scope.list();

          $scope.messageClass = 'alert-success';
          $scope.message = 'Mesa alterada';
        }
        ).error(function(res){
          $scope.messageClass = 'alert-danger';
          $scope.message = 'Problemas ao editar mesa';
        });
      };      

      $scope.list();

    });
