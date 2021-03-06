var expect = require('expect');
var request = require('supertest');
var {app} = require('./server.js');
var {wxDetails, getWxIcon} = require('./wx-functions.js');

describe('getWxIcon test', ()=> {
    
    it('should return \'wi wi-day-sunny-overcast\' when current condition is \'mostlysunny\'', () => {
        expect(getWxIcon('mostlysunny', 5)).toBe('wi wi-day-sunny-overcast');
    });
    
    //function use: getWxIcon(conditions, UV Index)
    it('should return \'wi wi-night-clear\' when condition is clear and UV index is 0', () => {
        expect(getWxIcon('clear', 0)).toBe('wi wi-night-clear');
    });
    
    it('should return \'wi wi-day-sunny\' when condition is clear and UV index is 3', () => {
        expect(getWxIcon('clear', 3)).toBe('wi wi-day-sunny');
    });
});

describe('HTTP status code tests', ()=> {
    
    it('should return status code 200 when valid location passed in URL', (done) => {
        request(app.listen())
            .get('/wx/Chicago,IL')
            .expect(200)
            .end(done);
    });
    
    it('should return status code 404 when invalid location passed in URL', (done) => {
        request(app.listen())
            .get('/wx/a!z$^0000')
            .expect(404)
            .end(done);
    });
    
    it('should return status code 302 when geolocation API response is received and app redirects', (done) => {
        request(app.listen())
            .get('/gwx')
            .expect(302)
            .end(done);
    });
});
