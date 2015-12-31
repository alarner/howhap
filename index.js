let Hogan = require('hogan.js');
module.exports = function(message, status, params) {
	let template = Hogan.compile(message);

	this.display = function() {
		return template.render(params);
	};

	this.toJSON = function() {
		return {
			message: message,
			status: status,
			params: params
		};
	};

	this.set = function(obj) {
		if(obj.hasOwnProperty('message')) {
			message = obj.message;
			template = Hogan.compile(message);
		}
		if(obj.hasOwnProperty('status')) {
			status = obj.status;
		}
		if(obj.hasOwnProperty('params')) {
			params = obj.params;
		}
	};
};