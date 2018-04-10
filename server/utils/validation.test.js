// expect
var expect = require('expect');

// isRealString function
var { isRealString } = require('./validation');

// isRealString tests
describe('isRealString', () => {
    it('should reject non string values', () => {
        var str = 1;
        var valid = isRealString(str);
        expect(valid).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var str = '     ';
        var valid = isRealString(str);
        expect(valid).toBe(false);
    });

    it('should allow strings with non-space characters', () => {
        var str = '   Rastko   ';
        var valid = isRealString(str);
        expect(valid).toBe(true);
    });
});