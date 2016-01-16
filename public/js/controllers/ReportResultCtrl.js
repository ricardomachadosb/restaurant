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
            $scope.labels = [];
            $scope.data = [];
            filters.reports.generateItensSales().then(function (res) {
                var quantity = [], total = [];
                $.each(res.data.dishes, function (k, v) {
                    $scope.labels.push(v.dish);
                    quantity.push(v.quantity);
                    total.push(v.total);
                });
                $scope.data.push(total);
                $scope.data.push(quantity);
            });
            break;

        default:
            break;
    }
});