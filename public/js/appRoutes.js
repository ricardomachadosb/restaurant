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
            templateUrl: 'views/user/list.html',
            controller: 'UserController'
        })

        .when('/pratos', {
            templateUrl: 'views/dish/list.html',
            controller: 'DishController'
        })

        .when('/bebidas', {
            templateUrl: 'views/drink/list.html',
            controller: 'DrinkController'
        })

        .when('/mesas', {
            templateUrl: 'views/table/list.html',
            controller: 'TableController'
        });

    $locationProvider.html5Mode(true);

}]);