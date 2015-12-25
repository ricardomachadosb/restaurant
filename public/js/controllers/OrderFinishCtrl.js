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
		$scope.avgTime = 0;
		if(order.dishes){
			var dishes = order.dishes;

			 for(var i =0; i < dishes.length; i++){
				 	if(dishes[i].quantity > 0){
		      	$scope.total += dishes[i].dish.price;

		      	if(dishes[i].dish.avgTime > $scope.avgTime){
		      		$scope.avgTime = dishes[i].dish.avgTime;
		      	}
		      }
	      }
		}
	};

	var sumDrink = function(order){
		if(order.drinks){
			var drinks = order.drinks;

			 for(var i =0; i < drinks.length; i++){
				 	if(drinks[i].quantity > 0){
		      		$scope.total += drinks[i].drink.price;
		      }
	     }

		}
	};

	$scope.initialize();
});