/**
 * 
 * @param {string} str - Represents any string
 * @returns {boolean} is it a string
 * @description Checks if given input is really a string
 */
var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

module.exports = { isRealString };
