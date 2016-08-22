var app = angular.module('QAApp', ["ngResource", "ngRoute"]);

app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
});

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'main.html',
      controller: 'QuestionController'
    })
    .when('/questions/:id', { // the "id" parameter
      templateUrl: 'question-show.html',
      controller: 'QuestionShowController'
    });

});
