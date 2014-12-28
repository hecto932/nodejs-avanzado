var env = process.env.NODE_ENV || 'production',
	express = require('express'),
	swig = require('swig'),
	bodyParser = require('body-parser'),
	middlewares = require('./middlewares/admin')
	router = require('./website/router');

var ExpressServer = function(config){
	config = config || {};

	this.expressServer = express();

	//MIDDLEWARES
	this.expressServer.use(bodyParser.urlencoded({extended: true}));
	for(var middleware in middlewares){
        this.expressServer.use(middlewares[middleware]);
    }

    //DE ESTA MANERA LE DECIMOS A EXPRESS QUE USE SWIG COMO MOTOR DE HTML
    this.expressServer.engine('html', swig.renderFile);
    //COMO TEMPLATE DE VISTA EL ENGINE USE HTML
    this.expressServer.set('view engine', 'html');
    //DONDE VAN A ENCONTRAR LOS TEMPLATES
    this.expressServer.set('views', __dirname + '/website/views/templates');

    //CAMBIO LAS LLAVES
    //swig.setDefaults({varControls: ['[[',']]']});

    if(env == 'development')
    {
    	console.log('OK NO HAY CACHE');
    	this.expressServer.set('view cache', false);
    	swig.setDefaults({cache: false});
    }

    /*
	this.expressServer.get('/article/save/', function(req, res, next){
		res.render('article_save', {nombre: 'Hector'});
		//res.send('Hello from article save');
	});

	this.expressServer.get('/article/list/', function(req, res, next){
		res.render('article_list', {});
	});
	*/
	for(var controller in router){
		for(var funcionalidad in router[controller].prototype){
			var method = funcionalidad.split('_')[0];
			var entorno = funcionalidad.split('_')[1];
			var data = funcionalidad.split('_')[2];
			data = (method == 'get' && data !== undefined) ? ':data' : '';
			var url = '/' + controller + '/' + entorno + '/' + data;
			console.log(url);
			this.router(controller, funcionalidad, method, url);
		}
	}	
};

ExpressServer.prototype.router = function(controller,funcionalidad, method, url){
	this.expressServer[method] (url, function(req, res, next){
		var conf = {
			'funcionalidad': funcionalidad,
			'req': req,
			'res': res,
			'next': next
		};

		var Controller = new router[controller](conf);
		Controller.response();
	});
}

module.exports = ExpressServer;