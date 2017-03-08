const expect = require('expect');
var {wxDetails, getWxIcon} = require('./wx-functions.js');

describe('getWxIcon test', ()=> {
    
    it('should return \'wi wi-day-sunny-overcast\'', () => {
        expect(getWxIcon('mostlysunny',5)).toBe('wi wi-day-sunny-overcast');
    })
});