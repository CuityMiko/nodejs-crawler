var mongoose = require('mongoose');

var Classify = mongoose.model('Classify');

var NewsSchema = new mongoose.Schema({
	dataId: String,
	title: String,
	publisher: String,
	time: String,
	classify: {
		name: String,
		url: String
	},
	link: String,
	linkText: String,
	commentNum: Number,
	approvalNum: Number,
	picUrl: String
});
module.exports = mongoose.model('News', NewsSchema);