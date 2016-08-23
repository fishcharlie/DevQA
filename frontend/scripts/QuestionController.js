angular.module('QAApp')
  .controller('QuestionController', QuestionController);

QuestionController.$inject = ["$http", "$scope", "Question"];
function QuestionController($http, $scope, Question){
  var self = this;

  function getQuestions(){
    var questions = Question.query(function () {
      self.questions = questions;
    });
  }
  getQuestions();


  $scope.submit = function () {
    var data = self.newQuestion;
    Question.save(data, function () {
      self.newQuestion = {};
      getQuestions();
    });
  };

  $scope.delete = function (id) {
    console.log(id);

    Question.remove({ id: id }, function() {
      getQuestions();
    });
  };

}


app.controller('QuestionShowController', function ($scope, Question, $routeParams, $http) {
  var self = this;
    console.log($routeParams.id);
    function getQuestion() {
      $http
        .get('http://localhost:3000/questions/'+$routeParams.id)
        .then(function(response){
          $scope.questions = response.data[0];
          console.log(response.data[0]);
      });
    }
    getQuestion();

    $scope.postAnswer = function (id) {
      console.log(id);
      var data = $scope.newAnswer;
      data.questionid = id;
      $http
        .post('http://localhost:3000/answers/', data)
        .then(function(response){
          $scope.newAnswer = {};
          getQuestion();
      });

    };

});

app.factory("Question", function($resource) {
  return $resource("http://localhost:3000/questions/:id");
});
