module.exports = function(req, res, next){
	res.locals.nick = 'Hector';
	next();
};