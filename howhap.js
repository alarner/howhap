'use strict';

/*
 * Stores and formats error information.
 *
 * let err =  new Howhap(
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
var Hogan = require('hogan.js');
module.exports = function (messageStatus, params) {
	if (Object.prototype.toString.call(messageStatus) !== '[object Object]') {
		throw 'First argument to Howhap constructor must be an object.';
	}
	if (!messageStatus.hasOwnProperty('message')) {
		throw 'First argument to Howhap constructor must contain a message property.';
	}
	if (!messageStatus.hasOwnProperty('status')) {
		throw 'First argument to Howhap constructor must contain a status property.';
	}

	var message = messageStatus.message;
	var status = parseInt(messageStatus.status);

	if (params === undefined || params === null) {
		if (messageStatus.hasOwnProperty('params')) {
			params = messageStatus.params;
		} else {
			params = {};
		}
	}

	if (typeof message !== 'string' && !(message instanceof String)) {
		throw 'Message property must be a string.';
	}
	if (status !== messageStatus.status) {
		throw 'Status property must be an integer.';
	}
	if (Object.prototype.toString.call(params) !== '[object Object]') {
		throw 'Params must be an object.';
	}

	var template = Hogan.compile(message);

	this.toString = function () {
		return template.render(params);
	};

	this.toJSON = function () {
		return {
			message: message,
			status: status,
			params: params
		};
	};

	this.set = function (obj) {
		if (obj.hasOwnProperty('message')) {
			message = obj.message;
			template = Hogan.compile(message);
		}
		if (obj.hasOwnProperty('status')) {
			status = obj.status;
		}
		if (obj.hasOwnProperty('params')) {
			params = obj.params;
		}
	};

	this.message = function () {
		return message;
	};
	this.status = function () {
		return status;
	};
	this.params = function () {
		return params;
	};
};
