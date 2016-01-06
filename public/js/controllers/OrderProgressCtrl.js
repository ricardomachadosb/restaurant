angular.module('OrderProgressCtrl', []).controller('OrderProgressController', function($scope, $http, $rootScope){

  $scope.initialize = function(){
    $scope.orderList = getOrdersInProgress();
  };

  var getOrdersInProgress = function(){
    
    $http.get('/api/order/listOrderInProgress', {headers: $rootScope.tokenHeader}).success(function(res){
      return res;
    }).error(function(res){
      console.log(res);
    });

  };

  $scope.initialize();

});
