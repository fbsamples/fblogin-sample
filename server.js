// Copyright (c) Facebook, Inc. and its affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.
// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

const express = require("express");
const app = express();
const got = require("got");
var bodyParser = require("body-parser");
var url = require("url");
const path = require("path");
const https = require("https");
var fs = require('fs');
var privateKey  = fs.readFileSync('./key.pem', 'utf8');
var certificate = fs.readFileSync('./cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

/*Use below code to create self signed https localhost using node*/

app.use(bodyParser.json());
app.use(express.static("views"));
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", function(request, response) {
  response.render("main");
});


const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});


var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);

app.post("/webhook", async (req, res) => {
  let body = req.body;
  console.log("Printing req.body below--");
  console.log(body);
  var login_id = "default";
  var page_access_token = process.env.PAGE_ACCESS_TOKEN;
  // Checks this is an event from a page subscription
  if (body.object === "page") {
    body.entry.forEach(function(entry) {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      console.log(webhook_event.optin); //This is where you get the login_id
      console.log(webhook_event.optin.login_id);
      login_id = webhook_event.optin.login_id;
      console.log(login_id);
    });
    try {
      if (login_id !== "default") {
        const response = await got.post(
          `https://graph.facebook.com/v10.0/me/messages?access_token=` +
            page_access_token,
          {
            responseType: "json",
            json: {
              messaging_type: "UPDATE",
              recipient: {
                login_id: login_id
              },
              message: {
                text:
                  "Welcome and thanks for signing up. Here is your welcome coupon code (CT45%) Test Message_Login Messenger integration"
              }
            }
          }
        );
        console.log("Printing the response from the Send API");
        console.log(response.body);
        res.status(200).send("EVENT_RECEIVED");
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.log(error.response);
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
