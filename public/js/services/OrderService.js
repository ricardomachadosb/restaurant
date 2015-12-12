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
        return res;
      }).error(function(res){
        console.log(res);
      });
    },

    getCurrentOrder: function(){
      return currentOrder;
    }

  }

  return orderService;

});