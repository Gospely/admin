
var Common = require('./CommonService');

var model = {
	instance: undefined,
	baseUrl: 'http://119.29.153.143:9999/'
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
