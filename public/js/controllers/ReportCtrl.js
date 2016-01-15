angular.module('ReportCtrl', []).controller('ReportController', function ($scope, $location, $http, $rootScope, filters) {

    $scope.generateGeneralBilling = function () {
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