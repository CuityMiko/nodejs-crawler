/*
 * @Author: Benson
 * @Date:   2016-10-31 22:38:00
 * @Last Modified by:   Benson
 * @Last Modified time: 2016-11-01 21:25:44
 */

var Promise = require('bluebird');

var Crawler = require('../crawler/crawler');
var mongoose = require('mongoose');
var News = mongoose.model('News');
//mongoose默认的mporomise已经被弃用了,这里手动指定mongoose使用的Promise库
mongoose.Promise = Promise;

var NewsBll = function() {

	var self = this;

	self.findAllNews = function() { //查询所有最热门的信息
		// return new Promise(function(resolve, reject) {
		// 	News.find().limit(2).exec(function(err, docs) {
		// 		if (err) {
		// 			reject(err);
		// 		}
		// 		resolve(docs);
		// 	})
		// });
		return News.find({
			"type": "news"
		}).limit(30).exec(function(err, docs) {
			return docs;
		})
	};

	self.findAllNewest = function() { //所有最新的
		return News.find({
			"type": "newest"
		}).limit(30).exec(function(err, docs) {
			return docs;
		})
	};

	self.findByDataId = function(dataId) {
		return News.findOne({
			'dataId': dataId
		}, function(err, doc) {
			return doc;
		});
	}

	self.updateTypeByDataId = function(dataId, type) {

		console.log('dataId = ' + dataId + '===type:' + type);
		News.update({
			'dataId': dataId
		}, {
			$set: {
				'type': ['news', 'newest']
			}
		}, function(err) {
			if (err) {
				console.log('error');
			}
			console.log('修改成功' + dataId);
		});
	};

	self.saveNews = function(data) {
		//注意此处 和 下面 querydataId 使用let 变量 使用var异步会使值覆盖
		for (let i = 0; i < data.length; i++) {
			let querydataId = data[i].dataId;
			console.log('querydataId:' + querydataId);
			self.findByDataId(querydataId).then(function(doc) {
				console.log('doc =' + doc);
				if (doc) {
					var type = ['news, newest'];
					self.updateTypeByDataId(querydataId, type);
				} else {
					console.log('i=' + i);
					var news = new News();

					news.dataId = data[i].dataId;
					news.title = data[i].title;
					news.publisher = data[i].publisher;
					news.publishTime = data[i].publishTime;
					news.classify.name = data[i].classify.name;
					news.classify.url = data[i].classify.url;
					news.link = data[i].link;
					news.linkText = data[i].linkText;
					news.commentNum = data[i].commentNum;
					news.approvalNum = data[i].approvalNum;
					news.picUrl = data[i].picUrl;
					news.type = data[i].type;

					news.save(function(err) {
						console.log(err);
					});
				}
			})
		}
	}
}

module.exports = NewsBll;