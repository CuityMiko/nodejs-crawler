var router = require('koa-router')();
var newsbll = require('../app/bll/newsbll');

var NewsController = require('../app/controllers/NewsController.js');

router.get('/', function(ctx, next) {
	ctx.body = 'this a users response!';
});

router.get('/data', function(ctx, next) {
	console.log('users/data');
	var newsController = new NewsController();
	newsController.findAllNews().then(function(items) {
		console.log(items)
		ctx.body = '获取数据完成';
		if (items) {

			return ctx.body = items;
		}
	});
	ctx.body = '获取数据中'
})

module.exports = router;