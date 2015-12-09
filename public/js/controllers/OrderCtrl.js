

angular.module('OrderCtrl', []).controller('OrderController', function($scope, $http, $rootScope, fileReader){
  
  $scope.order = {};

  $scope.firstStep = function(){
    $scope.table = {};
    $http.get('/api/table/list/' + $scope.currentPage, {headers: $rootScope.tokenHeader}).success(function(res){
      $scope.tableList = res;
    }).error(function(res){
      console.log(res);
    });
  };

  $scope.addTableToOrder = function(id){
     $http.get('/api/table/get/' + e, {headers: $rootScope.tokenHeader}).success(function(res){
        
        if(res.order != null){
          
        }
        
     });
  }

  $scope.firstStep();
});
