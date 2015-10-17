angular.module('DrinkCtrl').directive('confirmationNeededDrink', function () {
  return {
    priority: 1,
    terminal: true,
    link: function (scope, element, attr) {
      var clickAction = attr.ngClick;
      element.bind('click',function () {
        bootbox.confirm("Confirma a exclusão da bebida?", function(result) {
            if (result) {
                scope.$eval(clickAction);
            }
        });
      });
    }
  };
});