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

	$scope.addUser = function(){
		console.log($scope.user);
		$http.post('/api/user/create', $scope.user).success(

			function(res){
				//console.log(res);
				$scope.user = "";
				$scope.list();
			}
		);
	};

	$scope.remove = function( e ){
		$http.post('/api/user/remove').success(

			function(res){
				$scope.list();
			}

		);
	};

	$scope.list();
});