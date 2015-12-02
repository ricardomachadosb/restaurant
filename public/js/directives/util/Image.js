var fileFunctions = function () {
  return {
    link: function(scope, element){
        element.bind("change", function(e){
          scope.file = (e.srcElement || e.target).files[0];
          scope.getFile();
      })

    }

  }
};

angular.module('DishCtrl').directive('ngFileSelect', fileFunctions);
angular.module('DrinkCtrl').directive('ngFileSelect', fileFunctions);

