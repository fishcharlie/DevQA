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







var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
