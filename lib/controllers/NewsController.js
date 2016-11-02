/*
 * @Author: Benson
 * @Date:   2016-11-01 20:52:31
 * @Last Modified by:   Benson
 * @Last Modified time: 2016-11-02 23:32:22
 */
var NewsBll = require('../bll/newsbll');
var Crawler = require('../crawler/crawler');
var config = require('../config/config');
// var client = require('../config/redis');
var bluebird = require('bluebird');
var redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var client = redis.createClient();

function NewsController() {
	var self = this;

	self.findAllNews = function() { //所有热门的

		return client.getAsync('news').then(function(res) {
			if (!res) {
				var newsbll = new NewsBll();
				return newsbll.findAllNews().then(function(items) {
					if (items.length == 0) { //没有值就去爬虫
						console.log('没有数据, 正在爬虫')
						var crawler = new Crawler(config.crawlerUrlConfig.newsRootUrl);
						return crawler.crawler().then(function(data) {
							newsbll.saveNews(data);
							client.set('news', JSON.stringify(data));
							return data;
						});
					}
					return items;
				});
			}
			return '来自于redis:news' + res;;
		})
	};

	self.findAllNewest = function() { //所有最新的
		return client.getAsync('newest').then(function(res) {
			if (!res) {
				var newsbll = new NewsBll();
				return newsbll.findAllNewest().then(function(items) {
					if (items.length == 0) { //没有值就去爬虫
						console.log('没有数据, 正在爬虫')
						var crawler = new Crawler(config.crawlerUrlConfig.newestRootUrl);
						return crawler.crawler().then(function(data) {
							newsbll.saveNews(data);
							client.set('newest', JSON.stringify(data));
							return data;
						});
					}
					return items;
				});
			}
			return '来自于redis:newest' + res;
		})

	};
}

module.exports = NewsController;