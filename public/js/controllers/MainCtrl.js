angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $cookies, $rootScope) {

	var checkAuth = function(){
		$rootScope.token = $cookies.get('token');
		$rootScope.authenticated = $cookies.get('authenticated');
	};

	checkAuth();

	$scope.auth = function(){
		$http.post('/api/authenticate', $scope.login).success(function(res){
			$rootScope.token = res.token;
			$rootScope.authenticated = true;
			$cookies.put('token', res.token);
			$cookies.put('authenticated', true);
		}).error(function(res){
			console.log(res);
		});
	};

	$scope.logout = function(){
		$rootScope.token = '';
		$rootScope.authenticated = false;
		$cookies.put('token', '');
		$cookies.put('authenticated', false);
	};

});