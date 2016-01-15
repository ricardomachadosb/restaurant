angular.module('OrderFinishCtrl', ['OrderService', 'SocketService']).controller('OrderFinishController', function($scope, $http, $rootScope, $location, orderService, socketService){
	var currentOrder;

	$scope.initialize = function(){
		currentOrder = orderService.getCurrentOrder();
		$scope.currentOrder = currentOrder;

		$scope.total = 0;
		$scope.avgTime = 0;

		sumDishes(currentOrder);
		sumDrink(currentOrder);

		if(!currentOrder.avgTime){
			currentOrder.avgTime = $scope.avgTime;
		}
	};

	$scope.finish = function(){
	    currentOrder = orderService.getCurrentOrder();
	    currentOrder.status = $rootScope.orderStatusCodeInProgress;

	    saveOrder(currentOrder);

	    socketService.emit("new order", currentOrder);
	};

	$scope.setPayed = function(){
		currentOrder = orderService.getCurrentOrder();
		currentOrder.totalPrice = 0;
		orderService.addDishValueToTotal(currentOrder);
	    orderService.addDrinkValueToTotal(currentOrder);
		currentOrder.status = $rootScope.orderStatusCodePayed;
		setTablesToAvailable(currentOrder);
		saveOrder(currentOrder);

		socketService.emit("delete order", null);
	};

	var sumDishes = function(order){
		$scope.avgTime = 0;
		if(order.dishes){
			var dishes = order.dishes;

			for(var i =0; i < dishes.length; i++){
				for(var ii =0; ii < dishes[i].quantity; ii++){
					$scope.total += dishes[i].dish.price;
				}
				if((dishes[i].quantity > 0) && (dishes[i].dish.avgTime > $scope.avgTime)){
					$scope.avgTime = dishes[i].dish.avgTime;
				}
			}
		}
	};

	var sumDrink = function(order){
		if(order.drinks){
			var drinks = order.drinks;

			for(var i =0; i < drinks.length; i++){
				for(var ii =0; ii < drinks[i].quantity; ii++){
					$scope.total += drinks[i].drink.price;
			      }
		     	}
		    }
	};

	var saveOrder = function(order){
	  	$http.put('/api/order/put/' + order._id, order, {headers: $rootScope.tokenHeader}).success(function(res){
	  		returnToOrderList();
	  	}).error(function(res){
          $scope.messageClass = 'alert-danger';
          $scope.message = 'Problemas ao atualizar pedido';
	  	});
 	};

 	var setTablesToAvailable = function(order){
 		if(order && order.tables){
	 		for(var i = 0; i < order.tables.length; i++){
	 			order.tables[0].status = false;
	 		}
 		}

		$http.post('/api/table/saveAll', order.tables, {headers: $rootScope.tokenHeader})
			.success(function(res){});
 	};

	$scope.initialize();

	var returnToOrderList = function(){
		$location.path("/pedidos");
	}
});