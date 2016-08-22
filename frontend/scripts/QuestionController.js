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


app.factory("Question", function($resource) {
  return $resource("http://localhost:3000/questions/:id");
  // return $resource("https://shielded-forest-41789.herokuapp.com/api/flashcards/:id");
});
