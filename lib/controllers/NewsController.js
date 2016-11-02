/*
 * @Author: Benson
 * @Date:   2016-11-01 20:52:31
 * @Last Modified by:   Benson
 * @Last Modified time: 2016-11-01 21:12:51
 */
var NewsBll = require('../bll/newsbll');
var Crawler = require('../crawler/crawler');
var config = require('../config/config');

function NewsController() {
	var self = this;

	self.findAllNews = function() { //所有热门的
		var newsbll = new NewsBll();
		return newsbll.findAllNews().then(function(items) {
			if (items.length == 0) { //没有值就去爬虫
				console.log('没有数据, 正在爬虫')
				var crawler = new Crawler(config.crawlerUrlConfig.newsRootUrl);
				return crawler.crawler().then(function(data) {
					newsbll.saveNews(data);
					return data;
				});
			}
			return items;
		});
	};

	self.findAllNewest = function() { //所有最新的
		var newsbll = new NewsBll();
		return newsbll.findAllNewest().then(function(items) {
			console.log(items + '=========');
			if (items.length == 0) { //没有值就去爬虫
				console.log('没有数据, 正在爬虫')
				var crawler = new Crawler(config.crawlerUrlConfig.newestRootUrl);
				return crawler.crawler().then(function(data) {
					newsbll.saveNews(data);
					return data;
				});
			}
			return items;
		});
	};
}

module.exports = NewsController;