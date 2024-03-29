/**
 * 
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in datawriting, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var data = require('./data.json');
var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var AssistantV2 = require('ibm-watson/assistant/v2'); // watson sdk
const { IamAuthenticator } = require('ibm-watson/auth');

var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

// Create the service wrapper

var assistant = new AssistantV2({
  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_IAM_APIKEY
  }),
  url: process.env.ASSISTANT_IAM_URL,
});


// Endpoint to be call from the client side
app.post('/api/message', function (req, res) {
  console.log("I am here");
  let assistantId = process.env.ASSISTANT_ID || '<assistant-id>';
  if (!assistantId || assistantId === '<assistant-id>') {
    return res.json({
      'output': {
        'text': 'The app has not been configured with a <b>ASSISTANT_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/assistant-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/assistant-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    });
  }

  var textIn = '';

  if(req.body.input) {
    textIn = req.body.input.text;
  }
  console.log("sessionId: " + JSON.stringify(req.body));
  var payload = {
    assistantId: assistantId,
    sessionId: req.body.session_id,
    input: {
      message_type : 'text',
      text : textIn
    }
  };

  // Send the input to the assistant service
  assistant.message(payload, function (err, data) {
    if (err) {
      console.log(err);
      const status = (err.code  !== undefined && err.code > 0)? err.code : 500;
      return res.status(status).json(err);
    }

    return res.json(data);
  });
});


app.get('/api/getVehicleData', function (req, res) {

  let UserLicensePlate="";
  if(req.query.UserLicensePlate){
     UserLicensePlate = req.query.UserLicensePlate;
  } else {
    console.log("UserLicensePlate: " + req.query.UserLicensePlate)
  }

  let arrayOfVehicles = data.vehicleArray;
  for (var i = arrayOfVehicles.length - 1; i >= 0; i--) {
    var arrayOfEntities = arrayOfVehicles[i].vehicle
    for(var j = arrayOfEntities.length -1; j >= 0; j--){
      if( arrayOfEntities[j].entity == "licensePlate" && arrayOfEntities[j].value == UserLicensePlate){

        return res.json(arrayOfVehicles[i]);
      }
    }
  }
  return res.json({error: "not found"});
})

app.get('/api/getPersonData', function (req, res) {

  let usersName="";
  if(req.query.usersName){
     usersName = req.query.usersName;
  } else {
    
    console.log("usersName: " + req.query.usersName)
  }


  let arrayOfPeople = data.peopleArray;
  for (var i = arrayOfPeople.length - 1; i >= 0; i--) {
    var arrayOfEntities = arrayOfPeople[i].person
    for(var j = arrayOfEntities.length -1; j >= 0; j--){
      if( arrayOfEntities[j].entity == "name" && arrayOfEntities[j].value == usersName){

        return res.json(arrayOfPeople[i]);
      }
    }
  }
  return res.json({error: "not found"});
})


app.get('/api/session', function (req, res) {
  console.log(req.body);
  console.log("GETTING SESSION")

  assistant.createSession({
    assistantId: process.env.ASSISTANT_ID || '{assistant_id}',
  }, function (error, response) {
    if (error) {
      return res.send(error);
    } else {
      return res.send(response);
    }
  });
});

module.exports = app;