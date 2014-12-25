//ES UN ARCHIVO PARA TENER TODOS LOS MIDDLEWARES Y A DONDE EXPRESS VA A BUSCARLOS
module.exports = {
	static: require('./static'),
	favicon: require('./favicon')
}