
var Common = require('./CommonService');

var model = {
	instance: undefined,
	baseUrl: 'http://api.gospely.com/'
};

module.exports = {

	init: function(obj) {
		model.instance = obj;

		var tmpHttpGET = model.instance.$http.get;

		return {
			Common: Common.init(model.instance, model.baseUrl),
		}
	}

};
