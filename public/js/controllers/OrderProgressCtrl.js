angular.module('OrderProgressCtrl', ['OrderService', 'SocketService']).controller('OrderProgressController', function($scope, $http, $rootScope, $interval, socketService, orderService){

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

  $scope.shouldShowProgressToKitchen = function(order){
    var shouldShow = false;

    if(order && order.dishes){
      for(var i =0; i < order.dishes.length; i++){
        shouldShow = order.dishes[i].quantity > order.dishes[i].quantityDone;
        if(shouldShow){
          break;
        }
      }
    }
    return shouldShow;
  };

  $scope.putDishToDone = function(orderId, dishId){
    $http.get('/api/order/get/' + orderId, {headers: $rootScope.tokenHeader}).success(function(order){

      if(order.dishes){
        for(var i = 0; i < order.dishes.length; i++){
          if(order.dishes[i].dish._id == dishId && order.dishes[i].quantity > 0){
            order.dishes[i].quantityDone += 1;
          }
        }
        putDishDone(order);
      }

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

      if($scope.orderList[i].dishes){
        for(var ii = 0; ii< $scope.orderList[i].dishes.length; ii++){
          var percentCompleteDish = (timeDiff / ($scope.orderList[i].dishes[ii].dish.avgTime * 60000)) * 100;
          $scope.orderList[i].dishes[ii].percentComplete = percentCompleteDish;
        }
      }

    }
  };

  var schedulerPercentComplete = function(){
    var intervalPromise =  $interval(populatePercentComplete,  5 * 1000);
    $scope.$on('$locationChangeStart', function(event) {
      $interval.cancel(intervalPromise);
    });
  };

  var putDishDone = function(order){
    $http.put('/api/order/putDishDone/' + order._id, order, {headers: $rootScope.tokenHeader}).success(function(res){
      socketService.emit("update order", order);
    }).error(function(res){
        $scope.messageClass = 'alert-danger';
        $scope.message = 'Problemas ao atualizar pedido';
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

  socketService.on('update order', function(order){
    $scope.initialize();
  });

});
