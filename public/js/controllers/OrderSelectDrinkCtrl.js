
angular.module('OrderSelectDrinkCtrl', ['OrderService']).controller('OrderSelectDrinkController', function($scope, $http, $rootScope, orderService){

  var currentOrder;

  $scope.listOrderDrink = function(){
    $http.get('/api/drink/listAvailableDrinks', {headers: $rootScope.tokenHeader}).success(function(res){
      
      currentOrder = orderService.getCurrentOrder();

      if(!currentOrder.drinks){
      	currentOrder.drinks = [];
      }

      res = removeAssignedDrinksFromList(res, currentOrder);

      var orderDrinks = [];

      for(var i = 0; i < res.length; i++){
      	orderDrinks.push({ 
        	drink:res[i],
      		quantity:0, 
      		observation: ""
    	 });
      }

      currentOrder.drinks = currentOrder.drinks.concat(orderDrinks);

      $scope.currentOrder = currentOrder;

    }).error(function(res){
      console.log(res);
    });
  };

  var removeAssignedDrinksFromList = function(drinkList, order){
  	for(var i =0; i < order.drinks.length; i++){
      	for(var ii =0; ii < drinkList.length; ii++){
      		if(drinkList[ii]._id == order.drinks[i].drink._id){
      			drinkList.splice(ii,1);
      			break;
      		}
      	}
      }
      return drinkList;
  };

  $scope.increaseQuantity = function(orderDrink){
  	orderDrink.quantity += 1;

  	saveOrder(currentOrder);
  };

  $scope.decreaseQuantity = function(orderDrink){
  	if(orderDrink.quantity == 0){
  		return;
  	}
  	orderDrink.quantity -= 1;

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

  $scope.listOrderDrink();

});