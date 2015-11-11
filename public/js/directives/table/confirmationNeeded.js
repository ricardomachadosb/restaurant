angular.module('TableCtrl').directive('confirmationNeededTable', function () {
  return {
    priority: 1,
    terminal: true,
    link: function (scope, element, attr) {
      var clickAction = attr.ngClick;
      element.bind('click',function () {
        bootbox.confirm("Confirma a exclusão do prato?", function(result) {
            if (result) {
                scope.$eval(clickAction);
            }
        });
      });
    }
  };
});