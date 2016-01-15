angular.module('ReportCtrl', []).controller('ReportController', function ($scope, $location, $http, $rootScope, filters) {
    $scope.startDate = filters.getStartDate();
    $scope.endDate = filters.getEndDate();

    $scope.generateGeneralBilling = function () {
        $http.post('/api/report/generalBilling/', {start: $scope.startDate, end: $scope.endDate}, { headers: $rootScope.tokenHeader }).success(function (res) {
            console.log(res);
        }).error(function (res) {
            console.log(res);
        });
        $location.path("/relatorios/faturamentoGeral")
    };

    $scope.applyFilters = function () {
        filters.setStartDate($("input[name=start]").val());
        filters.setEndDate($("input[name=end]").val());
    }

    $('#datepicker').datepicker({
        format: "dd/mm/yyyy",
        todayBtn: "linked",
        language: "pt-BR",
        orientation: "bottom auto",
        autoclose: true,
        todayHighlight: true
    });
});