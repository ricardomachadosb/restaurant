angular.module('ReportCtrl', []).controller('ReportController', function ($scope, $location, $http, $rootScope, filters) {

    $scope.generateGeneralBilling = function () {
        filters.setReportType("generalBilling");        
        $location.path("/relatorios/faturamentoGeral")
    };
    
    $scope.generateItensSales = function(){
        filters.setReportType("itensSales");
        $location.path("/relatorios/vendaPorProduto")      
    }

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