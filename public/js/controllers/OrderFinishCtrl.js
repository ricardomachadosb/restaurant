angular.module('OrderFinishCtrl', ['OrderService']).controller('OrderFinishController', function($scope, $http, $rootScope, orderService){
	var currentOrder;

	$scope.initialize = function(){
		currentOrder = orderService.getCurrentOrder();
		$scope.currentOrder = currentOrder;

		$scope.total = 0;

		sumDishesToTotal(currentOrder);
		sumDrinkToTotal(currentOrder);
		
	};

	var sumDishesToTotal = function(order){
		if(order.dishes){
			var dishes = order.dishes;

			 for(var i =0; i < dishes.length; i++){
	      		$scope.total += dishes[i].dish.price;
	      	}
		}
	};

	var sumDrinkToTotal = function(order){
		if(order.drinks){
			var drinks = order.drinks;

			 for(var i =0; i < drinks.length; i++){
	      		$scope.total += drinks[i].drink.price;
	      	}
		}
	};

	$scope.initialize();
});