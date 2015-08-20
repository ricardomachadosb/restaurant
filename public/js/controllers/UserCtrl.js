//angular.module('NerdCtrl', []).controller('NerdController', function($scope) {
angular.module('UserCtrl', []).controller('UserController', function($scope, $http, $rootScope){
	$scope.list = function(){
		$http.get('/api/user/list', {headers: $rootScope.tokenHeader}).success(function(res){
			console.log(res);
			$scope.userList = res;
		}).error(function(res){
			console.log(res);
		});
	};

	$scope.list();
});