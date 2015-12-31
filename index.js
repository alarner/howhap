/*
 * Stores and formats error information.
 *
 * let err =  new Houston(
 *		{
 *		 	message: 'This is wrong: {{ what }}',
 *		 	status: 400
 *		},
 *		{
 *			what: 'me'
 *		}
 * );
 * res.status(err.status()).json(err.toJSON());
 * res.render('error-page', { error: err.toJSON() });
 */
let Hogan = require('hogan.js');
module.exports = function(messageStatus, params) {
	if(Object.prototype.toString.call(messageStatus) !== '[object Object]') {
		throw 'First argument to Houston constructor must be an object.';
	}
	if(!messageStatus.hasOwnProperty('message')) {
		throw 'First argument to Houston constructor must contain a message property.';
	}
	if(!messageStatus.hasOwnProperty('status')) {
		throw 'First argument to Houston constructor must contain a status property.';
	}

	let message = messageStatus.message;
	let status = messageStatus.status;
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

	this.message = function() {
		return message;
	};
	this.status = function() {
		return status;
	};
	this.params = function() {
		return params;
	};
};