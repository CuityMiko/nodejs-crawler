/*
 * @Author: Benson
 * @Date:   2016-10-31 22:38:00
 * @Last Modified by:   Benson
 * @Last Modified time: 2016-11-01 21:25:44
 */

var Promise = require('bluebird');

var Crawler = require('../../crawler/crawler');
var mongoose = require('mongoose');
var News = mongoose.model('News');

var NewsBll = function() {

	var self = this;

	self.findAllNews = function() { //所有最热的
		return new Promise(function(resolve, reject) {
			News.find().limit(2).exec(function(err, docs) {
				if (err) {
					reject(err);
				}
				resolve(docs);
			})
		});
	};

	self.findAllNewest = function() { //所有最新的

	}

	self.crawlerNewsData = function() {
		var crawler = new Crawler('https://segmentfault.com/news');

		crawler.sendData().then(function(data) {
			return data;
		}).then(function(data) {
			for (var i = 0; i < data.length; i++) {
				var news = new News();
				news.dataId = data[i].dataId;
				news.title = data[i].title;
				news.publisher = data[i].publisher;
				news.time = data[i].time;
				news.classify = data[i].classify.url;
				news.link = data[i].link;
				news.linkText = data[i].linkText;
				news.commentNum = data[i].commentNum;
				news.approvalNum = data[i].approvalNum;
				news.picUrl = data[i].picUrl;

				news.save(function(err) {
					if (err) {
						return next()
					}
					console.log('保存成功: ' +
						news);
				})
			}
		}).catch(function(err) {
			console.log(err);
		}).done();
	}
}

module.exports = NewsBll;