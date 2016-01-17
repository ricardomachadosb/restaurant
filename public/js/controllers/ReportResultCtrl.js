angular.module('ReportResultCtrl', ['chart.js']).controller('ReportResultController', function ($scope, $location, $http, $rootScope, filters) {
    $scope.startDate = filters.getStartDate();
    $scope.endDate = filters.getEndDate();
    $scope.result = {}
    $scope.reportType = filters.getReportType();

    switch ($scope.reportType) {
        case 'generalBilling':
            filters.reports.generateGeneralBilling().then(function (res) {
                $scope.result = res.data;
                $scope.labels = ['Pratos', 'Bebidas'];
                $scope.data = [res.data.totalDishes, res.data.totalDrinks];
                console.log(res.data.totalDishes);
            });
            break;
        case 'itensSales':
            $scope.dishesLabels = [];
            $scope.dishesData = [];
            $scope.drinksLabels = [];
            $scope.drinksData = [];            
            
            filters.reports.generateItensSales().then(function (res) {
                var dishesQuantity = [], dishesTotal = [], drinksQuantity = [], drinksTotal = [];
                $.each(res.data.dishes, function (k, v) {
                    $scope.dishesLabels.push(v.dish);
                    dishesQuantity.push(v.quantity);
                    dishesTotal.push(v.total);
                });
                
                $.each(res.data.drinks, function (k, v) {
                    $scope.drinksLabels.push(v.drink);
                    drinksQuantity.push(v.quantity);
                    drinksTotal.push(v.total);
                });
                $scope.dishesData.push(dishesTotal);
                $scope.dishesData.push(dishesQuantity);
                $scope.drinksData.push(drinksTotal);   
                $scope.drinksData.push(drinksQuantity);                             
            });
            break;

        default:
            break;
    }
});