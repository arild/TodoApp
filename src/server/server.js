var server = require('../../lib/node-router').getServer();
var fs = require('fs');
var path = require('path');
var index, app;

fs.readFile('./index.html', function (err, data) {
    if (err) {
        throw err;
    }
    index = data;
});

fs.readFile('../client/app.js', function (err, data) {
    if (err) {
        throw err;
    }
    app = data;
});

server.get("/", function (request, response) {
  	response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(index);
    response.end();
});

server.get("/#", function (request, response) {
  return;
});

server.get("/app.js", function (request, response) {
    response.writeHeader(200, {"Content-Type": "text/javascript"});
    response.write(app);
    response.end();
});

/*
server.get(new RegExp("^/user/(.*)$"), function hello(req, res, match) {
  if (match == 'arild') return '{ "user" : "arild", "items" : [ {"id" : "1", "text" : "do stuff"}, {"id" : "3", "text" : "do stuff again"} ]}';
  if (match == 'gaute') return '{ "user" : "gaute", "items" : [ {"id" : "2", "text" : "do stuff 2"}, {"id" : "4", "text" : "do stuff again 2"} ]}';
  return "Hello " + (match || "World") + "!";
});
*/



server.get(new RegExp("^/user/(.*)$"), function hello(request, response, match) {
  var json = '{ "user" : "0" }';
  if (match == 'arild') json = '{ "user" : "arild", "items" : [ {"id" : "1", "text" : "do stuff"}, {"id" : "3", "text" : "do stuff again"} ]}';
  if (match == 'gaute') json = '{ "user" : "gaute", "items" : [ {"id" : "2", "text" : "do stuff 2"}, {"id" : "4", "text" : "do stuff again 2"} ]}';
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(json);
  response.end();
});


server.get(new RegExp("^/lib/(.*)$"), function hello(request, response, match) {
    var filePath = '../..' + request.url;
    if (filePath == './')
        filePath = './index.htm';
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
});

server.get(new RegExp("^/(.*)$"), function hello(request, response, match) {
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.htm';
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
});
server.listen(80);