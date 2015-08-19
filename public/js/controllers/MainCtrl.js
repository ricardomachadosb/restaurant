angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	$scope.auth = function(){
		$http.post('/api/authenticate', $scope.login).success(function(res){
			console.log(res);
		}).error(function(res){
			console.log(res);
		});
	}

});