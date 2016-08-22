angular.module('QAApp')
  .controller('QuestionController', QuestionController);

QuestionController.$inject = ["$http", "$scope", "Question"];
function QuestionController($http, $scope, Question){
  var self = this;

  function getQuestions(){
    var questions = Question.query(function () {
      self.questions = questions;
    });

    // $http
    //   .get('http://localhost:3000/criminals')
    //   .then(function(response){
    //     self.criminals = response.data.criminals;
    // });
  }
  getQuestions();


  $scope.submit = function () {
    var data = self.newQuestion;
    Question.save(data, function () {
      self.newQuestion = {};
      getQuestions();
    });


    // $http
    //   .post('http://localhost:3000/criminals', data)
    //   .then(function(response){
    //     self.newCriminal = {};
    //     self.newCriminal.status = "Unknown";
    //     getCriminals();
    //   });
  };

  $scope.delete = function (id) {
    console.log(id);

    Question.remove({ id: id }, function() {
      getQuestions();
    });


    // $http
    //   .delete('http://localhost:3000/criminals/'+id)
    //   .then(function(response){
    //     getCriminals();
    //   });
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
