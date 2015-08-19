    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/examples/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/examples/nerd.html',
            controller: 'NerdController'
        })

        .when('/usuarios', {
            templateUrl: 'views/usuario/list.html',
            controller: 'UserController'
        });

    $locationProvider.html5Mode(true);

}]);