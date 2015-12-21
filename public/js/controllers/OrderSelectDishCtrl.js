
angular.module('OrderSelectDishCtrl', ['OrderService']).controller('OrderSelectDishController', function($scope, $http, $rootScope, orderService){

  var currentOrder;

  $scope.listOrderDish = function(){
    $http.get('/api/dish/list', {headers: $rootScope.tokenHeader}).success(function(res){
      
      currentOrder = orderService.getCurrentOrder();

      if(!currentOrder.dishes){
      	currentOrder.dishes = [];
      }

      console.log(currentOrder.dishes);

      res = removeAssignedDishesFromList(res, currentOrder);

      var orderDishes = [];

      for(var i = 0; i < res.length; i++){
      	orderDishes.push({ 
      		dish:res[i],
    		quantity:0, 
    		observation: ""
    	});
      }

      currentOrder.dishes = currentOrder.dishes.concat(orderDishes);

      $scope.currentOrder = currentOrder;

    }).error(function(res){
      console.log(res);
    });
  };

  var removeAssignedDishesFromList = function(dishList, order){
  	for(var i =0; i < order.dishes.length; i++){
      	for(var ii =0; ii < dishList.length; ii++){
      		if(dishList[ii]._id == order.dishes[i].dish._id){
      			dishList.splice(ii,1);
      			break;
      		}
      	}
      }
      return dishList;
  };

  $scope.increaseQuantity = function(orderDish){
  	orderDish.quantity += 1;

  	saveOrder(currentOrder);
  };

  $scope.decreaseQuantity = function(orderDish){
  	if(orderDish.quantity == 0){
  		return;
  	}
  	orderDish.quantity -= 1;

  	saveOrder(currentOrder);
  };

  $scope.changeObservation = function(){
  	saveOrder(currentOrder);
  };

  var saveOrder = function(order){
  	$http.put('/api/order/put/' + order._id, order, {headers: $rootScope.tokenHeader}).success(function(res){}
        ).error(function(res){
              $scope.messageClass = 'alert-danger';
              $scope.message = 'Problemas ao atualizar pedido';
  	});
  };

  $scope.listOrderDish();

});