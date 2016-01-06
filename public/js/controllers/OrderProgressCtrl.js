angular.module('OrderProgressCtrl', []).controller('OrderProgressController', function($scope, $http, $rootScope){

  $scope.initialize = function(){
    getOrdersInProgress();
  };

  var getOrdersInProgress = function(){
    
    $http.get('/api/order/listOrderInProgress', {headers: $rootScope.tokenHeader}).success(function(res){
       $scope.orderList = res;
       populatePercentComplete();
    }).error(function(res){
      console.log(res);
    });

  };

  var populatePercentComplete = function(){
    for(var i = 0; i < $scope.orderList.length; i++){
      var start = new Date($scope.orderList[i].lastModified);
      var today = new Date();
      var end = new Date(today.getTime() + ($scope.orderList[i].avgTime * 60000));
      console.log(100-(((end) - start) * 100 ) / today);
      $scope.orderList[i].percentComplete =  Math.round(100-(((end) - start) * 100 ) / today)
    }
  }

  $scope.initialize();

});
