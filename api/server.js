var express = require("express");
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var https = require('https');

var Question = require('./question_model.js');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/devqaapp');

app.use(function (req, res, next) {
    console.log(req.url);
    next();
});

// Get
app.get("/questions", function(req, res) {
    Question.find({}, function(err, questions) {
      if (err) {
        res.status(500).send('Error');
      }
      else {
        res.status(200).send(questions);
      }
    });
});

app.get("/questions/:id", function(req, res) {
    console.log("test");
    Question.find({_id: req.params.id}, function(err, question) {
      if (err) {
        res.status(500).send('Error');
      }
      else {
        res.status(200).send(question);
      }
    });
});


// Post
app.post("/questions", function(req, res) {
    var question = new Question({
      question: req.body.question,
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

// Put
app.put("/questions/:id", function(req, res) {
    Question.findById(req.param('id'), function(err, question) {
        if (req.body.question) {
            question.question = req.body.question;
        }
        question.save();
        res.send('OK');
    });
});

// Delete
app.delete("/questions/:id", function(req, res) {
    Question.findById(req.param('id'), function(err, question) {
      question.remove();
      res.send('OK');
    });
});





var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
