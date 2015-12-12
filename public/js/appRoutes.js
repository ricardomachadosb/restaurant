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
        })

       .when('/pedidos', {
            templateUrl: 'views/order/list.html',
            controller: 'OrderController'
        })

       .when('/pedidos/mesas', {
            templateUrl: 'views/order/list-seleciona-mesas.html',
            controller: 'OrderSelectTableController'
        })

       .when('/pedidos/pratos', {
            templateUrl: 'views/order/list-seleciona-prato.html',
            controller: 'OrderController'
        })

       .when('/pedidos/bebidas', {
            templateUrl: 'views/order/list-seleciona-bebida.html',
            controller: 'OrderController'
        })

       .when('/pedidos/final', {
            templateUrl: 'views/order/list-finaliza-pedido.html',
            controller: 'OrderController'
        });               

    $locationProvider.html5Mode(true);

}]);