angular.module('OrderProgressCtrl', ['SocketService']).controller('OrderProgressController', function($scope, $http, $rootScope, $interval, socketService){

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
      var end = start.getTime() + ($scope.orderList[i].avgTime * 60000);
      var diffMs = end - start;

      var timeDiff = today.getTime() - start.getTime();
      var percentComplete = (timeDiff / ($scope.orderList[i].avgTime * 60000)) * 100;
      $scope.orderList[i].percentComplete =  percentComplete;
    }
  };

  var schedulerPercentComplete = function(){
    var intervalPromise =  $interval(populatePercentComplete,  5 * 1000);
    $scope.$on('$locationChangeStart', function(event) {
      $interval.cancel(intervalPromise);
    });
  };

  $scope.initialize();
  schedulerPercentComplete();
  
  socketService.on('new order', function(order){
    $scope.initialize();
  });

  socketService.on('delete order', function(order){
    $scope.initialize();
  });

});
