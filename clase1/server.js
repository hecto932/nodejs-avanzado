var http = require('http'),
	conf = require('./conf'),
	mongoose = require('mongoose'),
	expressServer = require('./app/expressServer'),
	socketIO = require('./app/socketIO');

mongoose.connect('mongodb://' + conf.mongoDB.host + '/' + conf.mongoDB.name)

var app = new expressServer();

var server = http.createServer(app.expressServer);

var Io = new socketIO({server:server}); 

server.listen(conf.port);