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
            $scope.labels = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];
            $scope.data = [[65, 59, 90, 81, 56, 55, 40], [28, 48, 40, 19, 96, 27, 100]];
            filters.reports.generateItensSales().then(function (res) {
                console.log(res);
            });
            break;

        default:
            break;
    }
});