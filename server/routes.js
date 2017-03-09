const {API_KEY} = require('./api_key.js');

var hbs = require('hbs');
var express = require('express');
var request = require('request');
var {wxDetails, getWxIcon} = require('./wx-functions.js');

var router = express.Router();
var currentData, currentLocation, wxIcon, wxObj, errorObj;

router.route('/').get((req,res) => res.status(200).render('index.hbs'));

router.route('/wx/:id').get((req,res) => {
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
        wxIcon = getWxIcon(currentData.icon, currentData.UV);
        wxObj = wxDetails(currentData);
        return res.status(200).render('wx.hbs', {
            wxObj,
            wxIcon
        });
    });
});

router.route('/wxm/:id').get((req,res) => {
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
        wxIcon = getWxIcon(currentData.icon, currentData.UV);
        wxObj = wxDetails(currentData);
        return res.status(200).render('wxm.hbs', {
            wxObj,
            wxIcon,
        });
    });
});

module.exports = router;
