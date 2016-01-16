angular.module('ReportService', []).factory('filters', function ($http, $rootScope) {

    var startDate = "";
    var endDate = "";
    var reportType = "";
    var result = {};

    var setStartDate = function (value) {
        startDate = value;
    }

    var getStartDate = function () {
        return startDate;
    }
    
    var setReportType = function (value) {
        reportType = value;
    }

    var getReportType = function () {
        return reportType;
    }
    
    var setEndDate = function (value) {
        endDate = value;
    }

    var getEndDate = function () {
        return endDate;
    }

    var reports = {

        generateItensSales: function () {
            return $http.post('/api/report/itensSales', 
            {},
            {headers: $rootScope.tokenHeader});
        },

        generateGeneralBilling: function () {
            if (getStartDate() == undefined || getStartDate() == "" || getEndDate() == undefined || getEndDate() == "") {
                setStartDate(new Date());
                setEndDate(new Date());
            }
            return $http.post('/api/report/generalBilling/',
                { start: getStartDate(), end: getEndDate() },
                { headers: $rootScope.tokenHeader });
        }
    }

    return {
        setStartDate: setStartDate,
        getStartDate: getStartDate,
        setEndDate: setEndDate,
        getEndDate: getEndDate,
        setReportType: setReportType,
        getReportType: getReportType,
        reports: reports
    };

});