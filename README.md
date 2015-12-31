# Houston, we have a problem

A small library for displaying errors on the client or server.

`npm install --save howhap`

```js
let Howhap = require('howhap');

// Each error needs a message and a status code.
let authError = new Howhap({
	message: 'Please enter a password.',
	status: 400
});

// Errors can also use simple templating
let emailError = new Howhap({
	message: '"{{ email }}" is not a valid email.',
	status: 400
}, { email: 'fake' });

// You can display error messages as a string
emailError.toString(); // "fake" is not a valid email

// Or JSON
emailError.toJSON();
/*
 * {
 *	  message: '"{{ email }}" is not a valid email.',
 *	  status: 400,
 *	  params: { email: 'fake' }
 * }
 */
```
