// expect
var expect = require('expect');

// Functions to test
var { generateMessage, generateLocationMessage } = require('./message')

// generateMessage test
describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Rastko';
        var text = 'Hello everybody!';
        var message = generateMessage(from, text);

        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
});

// generateLocationMessage test
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = '20';
        var longitude = '40';

        var locationMessage = generateLocationMessage(from, latitude, longitude);

        expect(locationMessage.from).toBe(from);
        expect(locationMessage.url).toBe('https://www.google.com/maps?q=20,40');
        expect(locationMessage.createdAt).toBeA('number');
    });
});