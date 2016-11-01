/*
 * @Author: Benson
 * @Date:   2016-11-01 20:52:31
 * @Last Modified by:   Benson
 * @Last Modified time: 2016-11-01 21:12:51
 */
var NewsBll = require('../bll/newsbll');

function NewsController() {
	var self = this;

	self.findAllNews = function() { //所有最热的
		var newsbll = new NewsBll();
		return newsbll.findAllNews().then(function(items) {
			return items;
		});
	};

	self.findAllNewest = function() { //所有最新的

	};
}

module.exports = NewsController;