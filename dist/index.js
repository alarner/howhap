'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var message = null;
var status = null;
var params = null;
var template = null;

var Howhap = function () {
	function Howhap(messageStatus, constructorParams) {
		_classCallCheck(this, Howhap);

		if (Object.prototype.toString.call(messageStatus) !== '[object Object]') {
			throw new Error('First argument to Howhap constructor must be an object.');
		}
		if (!messageStatus.hasOwnProperty('message')) {
			throw new Error('First argument to Howhap constructor must contain a message property.');
		}
		if (!messageStatus.hasOwnProperty('status')) {
			throw new Error('First argument to Howhap constructor must contain a status property.');
		}

		if (constructorParams === undefined || constructorParams === null) {
			if (messageStatus.hasOwnProperty('params')) {
				constructorParams = messageStatus.params;
			} else {
				constructorParams = {};
			}
		}

		this.message = messageStatus.message;
		this.status = messageStatus.status;
		this.params = constructorParams;
	}

	_createClass(Howhap, [{
		key: 'toString',
		value: function toString() {
			return template.render(params);
		}
	}, {
		key: 'toJSON',
		value: function toJSON() {
			var newParams = {};
			for (var i in params) {
				newParams[i] = '' + params[i];
			}
			return {
				message: message,
				status: status,
				params: newParams
			};
		}
	}, {
		key: 'set',
		value: function set(obj) {
			if (obj.hasOwnProperty('message')) {
				this.message = obj.message;
			}
			if (obj.hasOwnProperty('status')) {
				this.status = obj.status;
			}
			if (obj.hasOwnProperty('params')) {
				this.params = obj.params;
			}
		}
	}, {
		key: 'message',
		get: function get() {
			return message;
		},
		set: function set(val) {
			if (typeof val !== 'string' && !(val instanceof String)) {
				throw new Error('Message property must be a string.');
			}
			message = val;
			template = Hogan.compile(message);
		}
	}, {
		key: 'status',
		get: function get() {
			return status;
		},
		set: function set(val) {
			var tmp = parseInt(val);
			if (tmp != val || isNaN(tmp)) {
				throw new Error('Status property must be an integer.');
			}
			status = tmp;
		}
	}, {
		key: 'params',
		get: function get() {
			return params;
		},
		set: function set(val) {
			if (val === undefined || val === null) {
				val = {};
			}

			if (Object.prototype.toString.call(val) !== '[object Object]') {
				throw new Error('Params property must be an object.');
			}
			params = val;
		}
	}]);

	return Howhap;
}();

Howhap.prototype.prototype = new Error();

module.exports = Howhap;