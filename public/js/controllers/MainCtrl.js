angular.module('MainCtrl', ['NerdService']).controller('MainController', function($scope, Nerd) {

//	var injector = angular.injector(['NerdService']);
  //  var Nerd = injector.get('Nerd');

	console.log(Nerd.get());
    $scope.tagline = 'To the moon and back!';

});