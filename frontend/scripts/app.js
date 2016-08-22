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

app.controller('QuestionShowController', function ($scope, Question, $routeParams, $http) {
    console.log($routeParams.id);
    // var question = Question.get({_id:$routeParams.id}, function() {
    //   self.question = question;
    // });
    $http
      .get('http://localhost:3000/questions/'+$routeParams.id)
      .then(function(response){
        $scope.questions = response.data[0];
        console.log(response.data[0]);
    });


});

app.factory("Question", function($resource) {
  return $resource("http://localhost:3000/questions/:id");
  // return $resource("https://shielded-forest-41789.herokuapp.com/api/flashcards/:id");
});
