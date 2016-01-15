angular.module('ReportResultCtrl', []).controller('ReportResultController', function ($scope, $location, $http, $rootScope, filters) {
    $scope.startDate = filters.getStartDate();
    $scope.endDate = filters.getEndDate();
    $scope.result = {};
    filters.reports.generateGeneralBilling().then(function (res) {
        $scope.result = res.data;
    });
});