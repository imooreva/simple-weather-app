const wxf = require('./wx-functions.js');
const express = require('express');
const hbs = require('hbs');
const request = require('request');

const port = process.env.PORT || 3000 //used for heroku
const API_KEY = '89c9f9e4a294d471';

var app = express();
var currentData, currentLocation, wxIcon, wxObj, errorObj;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log(`Server is up on port ${port}`));
app.get('/', (req,res) => res.status(200).render('index.hbs'));

app.get('/wx/:id', (req,res) => {
    let id = req.params.id;
    request({
        url: `https://api.wunderground.com/api/${API_KEY}/conditions/q/${id}.json`,
        json: true
    }, (error, response, body) => {        
        if (body.response.error) {
            errorObj = body.response.error;
            return res.status(404).render('E404.hbs', {
                errorObj
            });
        };
        currentData = body.current_observation;
        wxIcon = wxf.getWxIcon(currentData.icon, currentData.UV);
        wxObj = wxf.wxDetails(currentData);
        return res.status(200).render('wx.hbs', {
            wxObj,
            wxIcon
        });
    });
});

app.get('/wxm/:id', (req,res) => {
    let id = req.params.id;
    request({
        url: `https://api.wunderground.com/api/${API_KEY}/conditions/q/${id}.json`,
        json: true
    }, (error, response, body) => {        
        if (body.response.error) {
            errorObj = body.response.error;
            return res.status(404).render('E404.hbs', {
                errorObj
            });
        };
        currentData = body.current_observation;
        wxIcon = wxf.getWxIcon(currentData.icon, currentData.UV);
        wxObj = wxf.wxDetails(currentData);
        return res.status(200).render('wxm.hbs', {
            wxObj,
            wxIcon,
        });
    });
});
