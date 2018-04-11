// moment.js
var moment = require('moment');

/**
 * 
 * @param {string} from - Represents username 
 * @param {string} text - Represents message content
 * @description Returns a message object
 */
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

/**
 * 
 * @param {string} from - Represents username
 * @param {string} latitude 
 * @param {string} longitude 
 * @description Creates a Google Maps url, returns a Location Message Object
 * 
 */
var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = { generateMessage, generateLocationMessage };
