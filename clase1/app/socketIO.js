var Io = require('socket.io');

var SocketIO = function(config){
	this.config = config || {};
	var io = Io.listen(config.server);

	io.sockets.on('connection', function(socket){
		socket.emit('mejorandola', {hola:'Soy mejorandola'});
		
		socket.on('mejorandolo', function(data){
			console.log(data);
			socket.emit('mejorandolo', {hola:'Soy tambien soy mejorandolo'});
		});
	});

};

module.exports = SocketIO;