//angular.module('NerdCtrl', []).controller('NerdController', function($scope) {
angular.module('UserCtrl', []).controller('UserController', function($scope, $http, $rootScope){
	$scope.list = function(){
		$http.get('/api/user/list', {headers: $rootScope.tokenHeader}).success(function(res){
			$scope.userList = res;
		}).error(function(res){
			console.log(res);
		});
	};

	$scope.add = function(){
		$http.post('/api/user/create', $scope.user, {headers: $rootScope.tokenHeader}).success(

			function(res){
				$scope.user = "";
				$scope.list();
			}
		);
	};

	$scope.remove = function( id ){
		$http.delete('/api/user/remove/' + id, {headers: $rootScope.tokenHeader}).success(

			function(res){
				$scope.list();
			}

		);
	};

	$scope.edit = function( e ){
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
}).directive('userModalDirective', function() {
  return {
    templateUrl: "../../views/usuario/modal.html"
  };
});