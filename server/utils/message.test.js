var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate a correct message object', () => {
		var from = 'Jen';
		var text = 'Some message';
		var message = generateMessage(from,text);
		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({from, text});
	});
});

describe('generateLocationMessage', () => {
	it('should generate a correct location object', () => {
		var from = 'Jen';
		var latitude = 1;
		var longitude = 1;
		var message = generateLocationMessage(from,latitude, longitude);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({
			from, 
			url : 'https://www.google.com/maps?q=1,1'
		});
	});
});