const expect = require('expect');
const request = require('supertest');
var {wxDetails, getWxIcon} = require('./wx-functions.js');

describe('getWxIcon test', ()=> {
    
    it('should return \'wi wi-day-sunny-overcast\'', () => {
        expect(getWxIcon('mostlysunny',5)).toBe('wi wi-day-sunny-overcast');
    });
    
    it('should return status code 200 when valid location passed in URL', (done) => {
        request(app.listen())
            .get('/wx/Chicago,IL')
            .on('response', (res) => {
            expect(200)
        })
        done();
    });
    
    it('should return status code 404 when invalid location passed in URL', (done) => {
        request(app.listen())
            .get('/wx/a!z$^0000')
            .on('response', (res) => {
                expect(404)
        })
        done();
    });
});