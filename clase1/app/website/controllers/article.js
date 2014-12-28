var Article = function(conf){
	this.conf = conf || {};
	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
	}
};

Article.prototype.post_save = function(req, res, next){
	console.log(req.body);
	debugger;
}

Article.prototype.get_add = function(req, res, next){
	res.render('article_add', {nombre: 'add'});
};

Article.prototype.get_edit_data = function(req, res, next){
	res.render('article_save', {nombre: 'edit'});
};

Article.prototype.get_list = function(req, res, next){
	res.render('article_save', {nombre: 'list'});
};

module.exports = Article;