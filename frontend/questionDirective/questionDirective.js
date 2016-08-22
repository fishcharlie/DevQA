angular.module('QAApp')
  .directive('question', question);



  function question(){
    var directive = {
      //'A' == attribute, 'E' == element, 'C' == class
      restrict: 'E',
      replace: true,
//       template:  '<div class="card"> \
//         <h4 class="card-title">{{question}}</h4> \
//         <h5 class="card-title">{{answer}}</h5> \
//         <h6>Cards Against Assembly</h6> \
//         <button class="delete" ng-click="delete(cardid)">X</button> \
//       </div> \
// ',
      templateUrl: "questionDirective/questionDirective.html",
      // scope: {
      //     question: '@',
      //     cardid: '@',
      //     answer: '@',
      //     delete: '='
      // }
      scope: true
    };

    return directive;
  }
