var utils = require('./utils.js');

// load the things we need
var dynamoose = require('dynamoose');

// define the schema for our question model
var questionSchema = new dynamoose.Schema({
    _id: {type: String, required: true, default: function () {
        return utils.createID(utils.uid(16));
    }},
    question: {type: String, required: true},
    tags: {type: Array},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    answers: {type: Array},
}, {timestamps: true});

// create the model for questions and expose it to our app
module.exports = dynamoose.model('DevQA_Question', questionSchema);
