angular.module('ReportCtrl', []).controller('ReportController', function($scope, $location) {

    $scope.generateGeneralBilling = function() {
        $location.path("/relatorios/faturamentoGeral")
    };
    
    $('#datepicker').datepicker({
            format: "dd/mm/yyyy",
    todayBtn: "linked",
    language: "pt-BR",
    orientation: "bottom auto",
    autoclose: true,
    todayHighlight: true
    });
});