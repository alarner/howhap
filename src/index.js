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
let Hogan = require('hogan.js');
let message = null;
let status = null;
let params = null;
let template = null;
class Howhap {
	constructor(messageStatus, constructorParams) {
		if(Object.prototype.toString.call(messageStatus) !== '[object Object]') {
			throw new Error('First argument to Howhap constructor must be an object.');
		}
		if(!messageStatus.hasOwnProperty('message')) {
			throw new Error('First argument to Howhap constructor must contain a message property.');
		}
		if(!messageStatus.hasOwnProperty('status')) {
			throw new Error('First argument to Howhap constructor must contain a status property.');
		}

		if(constructorParams === undefined || constructorParams === null) {
			if(messageStatus.hasOwnProperty('params')) {
				constructorParams = messageStatus.params;
			}
			else {
				constructorParams = {};
			}
		}

		this.message = messageStatus.message;
		this.status = messageStatus.status;
		this.params = constructorParams;
	}

	toString() {
		return template.render(params);
	}

	toJSON() {
		let newParams = {};
		for(let i in params) {
			newParams[i] = ''+params[i];
		}
		return {
			message: message,
			status: status,
			params: newParams
		};
	}

	set(obj) {
		if(obj.hasOwnProperty('message')) {
			this.message = obj.message;
		}
		if(obj.hasOwnProperty('status')) {
			this.status = obj.status;
		}
		if(obj.hasOwnProperty('params')) {
			this.params = obj.params;
		}
	}

	get message() {
		return message;
	}

	set message(val) {
		if(typeof val !== 'string' && !(val instanceof String)) {
			throw new Error('Message property must be a string.');
		}
		message = val;
		template = Hogan.compile(message);
	}

	get status() {
		return status;
	}

	set status(val) {
		let tmp = parseInt(val);
		if(tmp != val || isNaN(tmp)) {
			throw new Error('Status property must be an integer.');
		}
		status = tmp;
	}

	get params() {
		return params;
	}

	set params(val) {
		if(val === undefined || val === null) {
			val = {};
		}
		
		if(Object.prototype.toString.call(val) !== '[object Object]') {
			throw new Error('Params property must be an object.');
		}
		params = val;
	}
}

Howhap.prototype.prototype = new Error();


module.exports = Howhap;