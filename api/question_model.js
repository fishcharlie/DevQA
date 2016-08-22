var utils = require('./utils.js');

// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our question model
var questionSchema = new Schema({
    question: {type: String, required: true},
    tags: {type: Array},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    answers: {type: Array},
});

// create the model for questions and expose it to our app
module.exports = mongoose.model('DevQA_Question', questionSchema);
