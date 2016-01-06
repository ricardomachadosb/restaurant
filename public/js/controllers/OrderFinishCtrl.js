angular.module('OrderFinishCtrl', ['OrderService']).controller('OrderFinishController', function($scope, $http, $rootScope, $location, orderService){
	var currentOrder;

	$scope.initialize = function(){
		currentOrder = orderService.getCurrentOrder();
		$scope.currentOrder = currentOrder;

		$scope.total = 0;
		$scope.avgTime = 0;

		sumDishes(currentOrder);
		sumDrink(currentOrder);

	};

	$scope.finish = function(){
	    currentOrder = orderService.getCurrentOrder();
	    currentOrder.status = $rootScope.orderStatusCodeInProgress;
	    saveOrder(currentOrder);

	    $location.path("/pedidos");
	};

	var sumDishes = function(order){
		$scope.avgTime = 0;
		if(order.dishes){
			var dishes = order.dishes;

			 for(var i =0; i < dishes.length; i++){
			 	for(var ii =0; ii < dishes[i].quantity; ii++){
			 		$scope.total += dishes[i].dish.price;
			 	}
			 	

		      	if(dishes[i].dish.avgTime > $scope.avgTime){
		      		$scope.avgTime = dishes[i].dish.avgTime;
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

	var saveOrder = function(order){
	  	$http.put('/api/order/put/' + order._id, order, {headers: $rootScope.tokenHeader}).success(function(res){}
	        ).error(function(res){
	              $scope.messageClass = 'alert-danger';
	              $scope.message = 'Problemas ao atualizar pedido';
	  	});
 	};

	$scope.initialize();
});