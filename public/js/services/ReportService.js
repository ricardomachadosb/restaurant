angular.module('ReportService', []).factory('filters', ['$http', function($http) {
    
    var startDate = "";
    var endDate = "";
    
    var setStartDate = function(value){
        startDate = value;
    }
    
    var getStartDate = function(){
        return startDate;
    }
    var setEndDate = function(value){
        endDate = value;
    }
    
    var getEndDate = function(){
        return endDate;
    }
    
    return {
        setStartDate: setStartDate,
        getStartDate: getStartDate,
        setEndDate: setEndDate,
        getEndDate: getEndDate
    }

}]);