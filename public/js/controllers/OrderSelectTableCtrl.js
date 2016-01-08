angular.module('OrderSelectTableCtrl', ['OrderService']).controller('OrderSelectTableController', function($scope, $http, $rootScope, orderService){

  var currentOrder = orderService.getCurrentOrder();
  $scope.tables = [];

  $scope.listAvaliableTables = function(){

    $http.get('/api/table/listAvaliableTables', {headers: $rootScope.tokenHeader}).success(function(res){

      $scope.$watch("currentOrder", function(newValue, oldValue){
        if(currentOrder.tables && currentOrder.tables.length > 0){
          $scope.tableList = res.concat(currentOrder.tables);
        }else {
          $scope.tableList = res;
        }
      });

      currentOrder = orderService.getCurrentOrder();

    }).error(function(res){
      console.log(res);
    });
  };

  $scope.listAvaliableTables();

  var changeSelecionCallBack = function(table, order){
    $http.put('/api/table/put/' + table._id, table, {headers: $rootScope.tokenHeader}).success(function(res){}
        ).error(function(res){
              $scope.messageClass = 'alert-danger';
              $scope.message = 'Problemas ao atualizar mesas';
        });

        $http.put('/api/order/put/' + order._id, order, {headers: $rootScope.tokenHeader}).success(function(res){}
        ).error(function(res){
              $scope.messageClass = 'alert-danger';
              $scope.message = 'Problemas ao atualizar pedido';
    });
  }

  $scope.changeSelection = function(id){
     currentOrder = orderService.getCurrentOrder();
     angular.forEach($scope.tableList, function(table){

         if(table._id == id){
            if(!table.status){
              table.orderId = null;

              for(var i = 0; i <=  currentOrder.tables.length - 1; i++){
                  if(currentOrder.tables[i]._id == id){
                      currentOrder.tables.splice(i,1);
                      changeSelecionCallBack(table, currentOrder);
                      break;
                  }
              }
              return;

            }else if(table.status){
              table.orderId = currentOrder._id;
              if(typeof currentOrder.tables === "undefined"){
                currentOrder.tables = [];
              }
              currentOrder.tables.push(table);

              changeSelecionCallBack(table, currentOrder);
              return;
            }
          };

     })

  }
});
