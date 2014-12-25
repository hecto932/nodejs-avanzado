var express = require('express'),
	swig = require('swig'),
	middlewares = require('./middlewares/admin');

var ExpressServer = function(config){
	config = config || {};

	this.expressServer = express();

	//MIDDLEWARES
	for(var middleware in middlewares){
        this.expressServer.use(middlewares[middleware]);
    }

    //DE ESTA MANERA LE DECIMOS A EXPRESS QUE USE SWIG COMO MOTOR DE HTML
    this.expressServer.engine('html', swig.renderFile);
    //COMO TEMPLATE DE VISTA EL ENGINE USE HTML
    this.expressServer.set('view engine', 'html');
    //DONDE VAN A ENCONTRAR LOS TEMPLATES
    this.expressServer.set('views', __dirname + '/website/views/templates');

	this.expressServer.get('/article/save/', function(req, res, next){
		res.render('article_save', {nombre: 'diego'});
		//res.send('Hello from article save');
	});

	this.expressServer.get('/article/list/', function(req, res, next){
		res.send('Hello from article list');
	});
};

module.exports = ExpressServer;