var express = require("express");
var dynamoose = require('dynamoose');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');

var Question = require('./question_model.js');

app.use(bodyParser.json());

// Setup Dynamoose
dynamoose.AWS.config.update({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: 'us-west-2',
  httpOptions: {
    agent: new https.Agent({
      rejectUnauthorized: true,
      keepAlive: true
    })
  }
});
dynamoose.setDefaults({
  create: true, // Create table in DB if it does not exist
  waitForActive: true,
  throughput: {read: 1, write: 1}
});


// Get
app.get("/questions", function(req, res) {
  var questionsArray = [];
    Question.scan({}, function(err, questions) {
      if (err) {
        res.status(500).send('Error');
      }
      else {
        questionsArray = questions;
        var lastKey = questions.lastKey;
        while (lastKey) {
          Question.scan().startAt(questions.lastKey).exec(function (err, questions) {
            lastKey = questions.lastKey;
            questions.forEach(function (item) {
              questionsArray.push(item);
            });
          });
        }
        res.status(200).send(questionsArray);
      }
    });
});

// Post
app.post("/questions", function(req, res) {
    var question = new Question({
      question: req.body.question,
      tags: req.body.tags,
    });

    question.save(function (err) {
        if (err) {
            res.status(500).send('Error');
        }
        else {
            res.status(200).send(question);
        }
    });


});

// // Put
// app.put("/flashcards/:id", function(req, res) {
//     Card.findById(req.param('id'), function(err, card) {
//         if (req.body.question) {
//             card.question = req.body.question;
//         }
//         if (req.body.answer) {
//             card.answer = req.body.answer;
//         }
//         card.save();
//         res.send('OK');
//     });
// });
//
// // Delete
// app.delete("/flashcards/:id", function(req, res) {
//     Card.findById(req.param('id'), function(err, card) {
//       card.remove();
//       res.send('OK');
//     });
// });





var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
