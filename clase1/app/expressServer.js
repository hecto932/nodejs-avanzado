var express = require('express'),
	middlewares = require('./middlewares/admin');

var ExpressServer = function(config){
	config = config || {};

	this.expressServer = express();

	//MIDDLEWARES
	for(var middleware in middlewares){
        this.expressServer.use(middlewares[middleware]);
    }

	this.expressServer.get('/article/save/', function(req, res, next){
		res.send('Hello from article save');
	});

	this.expressServer.get('/article/list/', function(req, res, next){
		res.send('Hello from article list');
	});
};

module.exports = ExpressServer;