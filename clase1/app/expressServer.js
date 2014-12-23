var express = require('express');

var ExpressServer = function(config){
	config = config || {};

	this.expressServer = express();

	this.expressServer.get('/article/save/', function(req, res, next){
		res.send('Hello from article save');
	});

	this.expressServer.get('/article/list/', function(req, res, next){
		res.send('Hello from article list');
	});
};

module.exports = ExpressServer;