angular.module('OrderService', []).factory('orderService', function($rootScope, $http) {

  var currentOrder = {};

  var countOrder = function(){

    $http.get('/api/order/count', {headers: $rootScope.tokenHeader}).success(function(res){
      return res;
    }).error(function(res){
      console.log(res);
    });

  }


  var orderService = {

    generateOrder: function(){
      $http.post('/api/order/generateOrder', {}, {headers: $rootScope.tokenHeader}).success(function(res){
          currentOrder = res;
        }).error(function(res){
          console.log(res);
      });
    },

    addDishValueToTotal: function(order){
      if(order && order.dishes){
        for(var i =0; i < order.dishes.length; i++){
          for(var ii =0; ii < order.dishes[i].quantity; ii ++){
            order.totalPrice += order.dishes[i].dish.price;
          }
        }
      }
    },

    addDrinkValueToTotal: function(order){
      if(order && order.drinks){
        for(var i =0; i < order.drinks.length; i++){
          for(var ii =0; ii < order.drinks[i].quantity; ii ++){
            order.totalPrice += order.drinks[i].drink.price;
          }
        }
      }
    },

    getCurrentOrder: function(){
      return currentOrder;
    },

    clearCurrentOrder: function(){
      currentOrder = {};
    },

    setCurrentOrder: function(id, callback){
      $http.get('/api/order/get/' + id, {headers: $rootScope.tokenHeader}).success(function(res){
          currentOrder = res;
          if(callback){
            callback();
          }
        }).error(function(res){
          console.log(res);
      });
    },

    get: function(id, callback){
      $http.get('/api/order/get/' + id, {headers: $rootScope.tokenHeader}).success(function(res){
          if(callback){
            callback();
          }

          return res;

        }).error(function(res){
          console.log(res);
      });
    }

  }

  return orderService;

});