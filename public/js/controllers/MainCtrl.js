angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $cookies, $rootScope, $location) {

	$rootScope.currencyPattern= "^([0-9]{1,3}|100)([.][0-9]{1,2})?$";
  	$rootScope.orderStatusCodeNew= 1;
  	$rootScope.orderStatusCodeInProgress= 2;
  	$rootScope.orderStatusCodeClosed= 3;
  	$rootScope.orderStatusCodePayed= 4;

  	$rootScope.numberOnlyPattern= "^[0-9]{1,3}$";

	var checkAuth = function(){
		$rootScope.token = $cookies.get('token');
		$rootScope.authenticated = ($cookies.get('authenticated') == 'true');
		$rootScope.tokenHeader =  {'x-access-token': $rootScope.token, 'content-type': 'application/json'};
		if($rootScope.authenticated){
			$rootScope.bodyClass = "body-authenticated";
		}else {
			$rootScope.bodyClass = "body-not-authenticated";
		}
	};

	checkAuth();

	$scope.auth = function(){
		$http.post('/api/authenticate', $scope.login).success(function(res){
			if(res.success){
				$rootScope.bodyClass = "body-authenticated";
				$rootScope.token = res.token;
				$rootScope.tokenHeader =  {'x-access-token': res.token};
				$rootScope.authenticated = true;
				$rootScope.authError = false;
				$cookies.put('token', res.token);
				$cookies.put('authenticated', true);
				$scope.login.password="";
				$scope.login.name="";
			}else {
				$rootScope.authError = true;
			}
		}).error(function(res){
			console.log(res);
		});
	};

	$scope.logout = function(){
		$rootScope.token = '';
		$rootScope.authenticated = false;
		$cookies.put('token', '');
		$cookies.put('authenticated', false);
		$rootScope.bodyClass = "body-not-authenticated";
		$location.path( "/");
	};

	$rootScope.formatTablesText = function(order){
		var formatedText = "";
		if(order && order.tables && order.tables.length > 0){
			if(order.tables.length > 1){
				for(var i = 0; i <= order.tables.length - 1; i++){
					if(i == order.tables.length - 1){
						formatedText += order.tables[i].code;
					}else {
						formatedText += (order.tables[i].code + ", ")
					}
				}
			}else {
				formatedText = order.tables[0].code;
			}
		}
		return formatedText;
	};

	$rootScope.allRoles = [{key: 'Cozinheiro', value: 'ROLE_COOK'}, {key: 'Atendente', value:'ROLE_CASHIER'},
		{key: 'Garçom', value: 'ROLE_WAITER'}, {key: 'Administrador', value: 'ROLE_ADMIN'}];
});