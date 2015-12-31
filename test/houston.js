let expect = require('chai').expect;
let Houston = require('../index.js');
describe('Houston', function() {
	describe('errors', function() {
		it('should not allow non-objects for the first parameter of the constructor', function() {
			expect(() => { new Houston(); })
				.to.throw('First argument to Houston constructor must be an object.');

			expect(() => { new Houston('test'); })
				.to.throw('First argument to Houston constructor must be an object.');

			expect(() => { new Houston(['array']); })
				.to.throw('First argument to Houston constructor must be an object.');

			expect(() => { new Houston(function() {}); })
				.to.throw('First argument to Houston constructor must be an object.');
		});

		it('should require the first argument to have a message property', function() {
			expect(() => { new Houston({}); })
				.to.throw('First argument to Houston constructor must contain a message property.');

			expect(() => { new Houston({foo: 'test'}); })
				.to.throw('First argument to Houston constructor must contain a message property.');

			expect(() => { new Houston({status: 400}); })
				.to.throw('First argument to Houston constructor must contain a message property.');
		});

		it('should require the first argument to have a status property', function() {
			expect(() => { new Houston({message: 'test'}); })
				.to.throw('First argument to Houston constructor must contain a status property.');

			expect(() => { new Houston({message: 'foo', blah: 'yes'}); })
				.to.throw('First argument to Houston constructor must contain a status property.');

			expect(() => { new Houston({message: '123'}); })
				.to.throw('First argument to Houston constructor must contain a status property.');
		});

		it('should require that the message property is a string', function() {
			expect(() => { new Houston({message: false, status: 400}); })
				.to.throw('Message property must be a string.');

			expect(() => { new Houston({message: 7, status: 400}); })
				.to.throw('Message property must be a string.');

			expect(() => { new Houston({message: [], status: 400}); })
				.to.throw('Message property must be a string.');

			expect(() => { new Houston({message: {}, status: 400}); })
				.to.throw('Message property must be a string.');
		});

		it('should require that the status property is a number', function() {
			expect(() => { new Houston({message: 'msg', status: false}); })
				.to.throw('Status property must be an integer.');

			expect(() => { new Houston({message: 'msg', status: []}); })
				.to.throw('Status property must be an integer.');

			expect(() => { new Houston({message: 'msg', status: {}}); })
				.to.throw('Status property must be an integer.');

			expect(() => { new Houston({message: 'msg', status: '400'}); })
				.to.throw('Status property must be an integer.');

			expect(() => { new Houston({message: 'msg', status: 12.1}); })
				.to.throw('Status property must be an integer.');

			expect(() => { new Houston({message: 'msg', status: '12.1'}); })
				.to.throw('Status property must be an integer.');
		});

		it('should require that params be empty or an object', function() {
			expect(() => { new Houston({message: 'msg', status: 400}, 123); })
				.to.throw('Params must be an object.');

			expect(() => { new Houston({message: 'Hello {{ world }}', status: 404}, false); })
				.to.throw('Params must be an object.');

			expect(() => { new Houston({message: 'This is a test', status: 500}, 'test'); })
				.to.throw('Params must be an object.');

			expect(() => { new Houston({message: 'Bad gateway', status: 502}, [1,2,3]); })
				.to.throw('Params must be an object.');

			expect(() => { new Houston({message: 'Bad gateway', status: 502, params: 'foo'}); })
				.to.throw('Params must be an object.');
		});

		it('should accept valid input', function() {
			expect(() => { new Houston({message: 'msg', status: 400}); })
				.to.not.throw(Error);

			expect(() => { new Houston({message: 'Hello {{ world }}', status: 404}); })
				.to.not.throw(Error);

			expect(() => { new Houston({message: 'This is a test', status: 500}); })
				.to.not.throw(Error);

			expect(() => { new Houston({message: 'Bad gateway', status: 502}); })
				.to.not.throw(Error);
		});

		it('should allow conversion to json', function() {
			let data = {message: 'Bad gateway', status: 502, params: {foo: 'bar'}};
			let x = new Houston(data);
			expect(x.toJSON()).to.deep.equal(data);

			let y = new Houston({message: 'Bad gateway', status: 502}, {foo: 'bar'});
			expect(y.toJSON()).to.deep.equal(data);
		});

		it('should allow conversion to a string', function() {
			let data = {message: 'Bad gateway', status: 502, params: {foo: 'bar'}};
			let x = new Houston(data);
			expect(x.toString()).to.equal('Bad gateway');

			let y = new Houston({message: 'Bad gateway', status: 502}, {foo: 'bar'});
			expect(y.toString()).to.equal('Bad gateway');
		});

		it('should replace template params', function() {
			let data = {message: 'Bad gateway {{ foo }}', status: 502, params: {foo: 'bar'}};
			let x = new Houston(data);
			expect(x.toString()).to.equal('Bad gateway bar');

			let y = new Houston({message: 'Bad gateway {{ foo }} {{ baz }}', status: 502}, {foo: 'baz'});
			expect(y.toString()).to.equal('Bad gateway baz ');
		});
	});
});