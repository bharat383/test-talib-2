// Include http module.
//var http = require("http");

var express = require('express');
var request = require('request');
var app = express(); 
//http://localhost:3000/_getproduct/8821264 
app.get('http://asitji.com/lts/webservices/apis.php?apiname=labels', function(req, res) { 
       if (!req.params.id) { 
           res.status(500); 
           res.send({"Error": "Looks like you are not senging the product id to get the product details."}); 
           console.log("Looks like you are not senging the product id to get the product detsails."); 
       } 
      request.get({ url: "http://asitji.com/lts/webservices/apis.php?apiname=labels" + req.params.id },      function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
                  res.json(body); 
                  console.log(body);
                 } 
             }); 
     }); 
/*
var Client = require('node-rest-client').Client;

var client = new Client(options_auth);
 
// handling request error events 
client.get("http://asitji.com/lts/webservices/apis.php?apiname=labels", function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
}).on('error', function (err) {
    console.log('something went wrong on the request', err.request.options);
});
 
// handling client error events 
client.on('error', function (err) {
    console.error('Something went wrong on the client', err);
});

/*

// Create the server. Function passed as parameter is called on every request made.
// request variable holds all request parameters
// response variable allows you to do anything with response sent to the client.
http.createServer(function (request, response) {
	// Attach listener on end event.
	// This event is called when client sent all data and is waiting for response.
	request.on("end", function () {
		// Write headers to the response.
		// 200 is HTTP status code (this one means success)
		// Second parameter holds header fields in object
		// We are sending plain text, so Content-Type should be text/plain
		response.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		// Send data and end response.
		response.end('Hello HTTP!');
	});
// Listen on the 8080 port.*/