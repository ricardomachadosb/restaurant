angular.module('OrderFinishCtrl', ['OrderService']).controller('OrderFinishController', function($scope, $http, $rootScope, orderService){
	var currentOrder;

	$scope.initialize = function(){
		currentOrder = orderService.getCurrentOrder();
		$scope.currentOrder = currentOrder;

		$scope.total = 0;
		$scope.avgTime = 0;

		sumDishes(currentOrder);
		sumDrink(currentOrder);
		
	};

	var sumDishes = function(order){
		if(order.dishes){
			var dishes = order.dishes;

			 for(var i =0; i < dishes.length; i++){
	      		$scope.total += dishes[i].dish.price;
	      		$scope.avgTime +=  dishes[i].dish.avgTime;
	      	} 
		}
	};

	var sumDrink = function(order){
		if(order.drinks){
			var drinks = order.drinks;

			 for(var i =0; i < drinks.length; i++){
	      		$scope.total += drinks[i].drink.price;
	      	}
		}
	};

	$scope.initialize();
});