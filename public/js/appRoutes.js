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
            controller: 'OrderSelectDishController'
        })

       .when('/pedidos/bebidas', {
            templateUrl: 'views/order/list-seleciona-bebida.html',
            controller: 'OrderSelectDrinkController'
        })

       .when('/pedidos/final', {
            templateUrl: 'views/order/list-finaliza-pedido.html',
            controller: 'OrderFinishController'
        })

       .when('/pedidos/fechar', {
            templateUrl: 'views/order/list-close-bill.html',
            controller: 'OrderFinishController'
        })       

       .when('/cliente', {
            templateUrl: 'views/orderProgress/listProgress.html',
            controller: 'OrderProgressController'
        })
        
        .when('/relatorios', {
            templateUrl: 'views/report/list.html',
            controller: 'ReportController'
        })
        
        .when('/relatorios/faturamentoGeral', {
            templateUrl: 'views/report/general-billing.html',
            controller: 'ReportController'
        })
        
        .when('/relatorios/resultado', {
            templateUrl: 'views/report/result.html',
            controller: 'ReportResultController'
        })

       .when('/cozinha', {
            templateUrl: 'views/orderProgress/listProgressKitchen.html',
            controller: 'OrderProgressController'
        });       

    $locationProvider.html5Mode(true);

}]);