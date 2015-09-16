//angular.module('NerdCtrl', []).controller('NerdController', function($scope) {
angular.module('UserCtrl', []).controller('UserController', function($scope, $http, $rootScope){
	$scope.list = function(){
		$http.get('/api/user/list', {headers: $rootScope.tokenHeader}).success(function(res){
			$scope.userList = res;
		}).error(function(res){
			console.log(res);
		});
	};

	$scope.addUser = function(){
		console.log($scope.user);

		$http.post('/api/user/create', $scope.user, {headers: $rootScope.tokenHeader}).success(

			function(res){
				$scope.user = "";
				$scope.list();
			}
		);
	};

	$scope.remove = function( e ){
		$http.delete('/api/user/remove/' + e, {headers: $rootScope.tokenHeader}).success(

			function(res){
				$scope.list();
			}

		);
	};

	$scope.editUser = function( e ){
		$http.get('/api/user/edit/' + e, {headers: $rootScope.tokenHeader}).success(function(res){
			$scope.user = res;
			/*
				Calling a modal with jquery.
				It's temporary.
			*/
			$('#myModal').modal('show');
		});

	};
	
	$scope.list();
});