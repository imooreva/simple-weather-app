//API key is .gitignore'd :)
const {API_KEY} = require('./api_key.js');

//require modules and external functions
var hbs = require('hbs');
var express = require('express');
var request = require('request');
var {wxDetails, getWxIcon} = require('./wx-functions.js');

//set up express
var router = express.Router();

//declare variables for later use
var currentData, currentLocation, wxIcon, wxObj, errorObj;

//main page
router.route('/').get((req,res) => res.status(200).render('index.hbs'));

//route renders imperial unit JSON data from wunderground's API
router.route('/wx/:id').get((req,res) => {
    //extract location ID from URL
    let id = req.params.id;
    request({
        url: `https://api.wunderground.com/api/${API_KEY}/conditions/q/${id}.json`,
        json: true
    }, (error, response, body) => {
        //render error page if there's a problem with the response
        if (body.response.error) {
            errorObj = body.response.error;
            return res.status(404).render('E404.hbs', {
                errorObj
            });
        };
        //assign JSON data to variable and pass variable to external functions to handle it
        currentData = body.current_observation;
        wxIcon = getWxIcon(currentData.icon, currentData.UV);
        wxObj = wxDetails(currentData);
        //render results to client's browser using returned object, CSS icon and template page
        return res.status(200).render('wx.hbs', {
            wxObj,
            wxIcon
        });
    });
});


//route renders metric unit JSON data from wunderground's API
router.route('/wxm/:id').get((req,res) => {
    //extract location ID from URL
    let id = req.params.id;
    request({
        url: `https://api.wunderground.com/api/${API_KEY}/conditions/q/${id}.json`,
        json: true
    }, (error, response, body) => {
        //render error page if there's a problem with the response
        if (body.response.error) {
            errorObj = body.response.error;
            return res.status(404).render('E404.hbs', {
                errorObj
            });
        };
        //assign JSON data to variable and pass variable to external functions to handle it
        currentData = body.current_observation;
        wxIcon = getWxIcon(currentData.icon, currentData.UV);
        wxObj = wxDetails(currentData);
        //render results to client's browser using returned object, CSS icon and template page
        return res.status(200).render('wxm.hbs', {
            wxObj,
            wxIcon,
        });
    });
});

module.exports = router;
