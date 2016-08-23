angular.module('QAApp')
  .directive('question', question);



  function question(){
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: "questionDirective/questionDirective.html",
      scope: true
    };

    return directive;
  }
