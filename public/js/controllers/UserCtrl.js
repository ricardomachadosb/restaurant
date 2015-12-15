//angular.module('NerdCtrl', []).controller('NerdController', function($scope) {
angular.module('UserCtrl', ['ImageService']).controller('UserController', function($scope, $http, $rootScope, fileReader){

	$scope.new = function(){
		$scope.user = "";
		for (var index in $rootScope.allRoles ){
			$rootScope.allRoles[index].ticked = false;
		};
	};

	$scope.list = function(){
		$scope.user = "";
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

				$scope.messageClass = 'alert-success';
				$scope.message = 'Usuário cadastrado';
			}
		).error(function(res){
			$scope.messageClass = 'alert-danger';
			$scope.message = 'Problemas ao cadastrar usuário';
		});
	};

	$scope.put = function(id){
		$http.put('/api/user/put/' + id, $scope.user, {headers: $rootScope.tokenHeader}).success(

			function(res){
				$scope.user = "";
				$scope.list();

				$scope.messageClass = 'alert-success';
				$scope.message = 'Usuário alterado';
			}
		).error(function(res){
			$scope.messageClass = 'alert-danger';
			$scope.message = 'Problemas ao editar usuário';
		});
	};

	$scope.remove = function( id ){
		$http.delete('/api/user/remove/' + id, {headers: $rootScope.tokenHeader}).success(

			function(res){
          if(res.success){
    				$scope.user = "";
    				$scope.list();

    				$scope.messageClass = 'alert-success';
    				$scope.message = 'Usuário deletado';
        }else {
          $scope.messageClass = 'alert-danger';
          $scope.message = res.message ? res.message : 'Problemas ao deletar Usuário';
        }
			}
		).error(function(res){
			$scope.messageClass = 'alert-danger';
			$scope.message = 'Problemas ao deletar Usuário';
		});
	};

	$scope.edit = function( e ){
		$http.get('/api/user/edit/' + e, {headers: $rootScope.tokenHeader}).success(function(res){
			$scope.user = res;

			for (var index in $rootScope.allRoles ){
				$rootScope.allRoles[index].ticked = false;
        for(var roleUserIndex in res.roles){
          if(res.roles[roleUserIndex].key == $rootScope.allRoles[index].key){
            $rootScope.allRoles[index].ticked = true;
          }
        }
      }
		});

	$scope.getFile = function () {
    $scope.progress = 0;
    fileReader.readAsDataUrl($scope.file, $scope)
    .then(function(result) {
      $scope.user.picture = [result];
    });
  };

  $scope.$on("fileProgress", function(e, progress) {
    $scope.progress = progress.loaded / progress.total;
  });

	};

	$scope.list();
});