//API key is .gitignore'd :)
const {API_KEY} = require('./api_key.js');

//require modules and external functions
var hbs = require('hbs');
var express = require('express');
var request = require('request');
var {wxDetails, getWxIcon} = require('./wx-functions.js');

//declare variables for later use
var currentData, currentLocation, wxIcon, errorObject;
var wxObject = {};

var wxImperial = (req,res) => {
    //extract location ID from URL
    let id = req.params.id;
    request({
        url: `https://api.wunderground.com/api/${API_KEY}/conditions/q/${id}.json`,
        json: true
    }, (error, response, body) => {
        //render error page if there's a problem with response
        if (body.response.error) {
            errorObject = body.response.error;
            return res.status(404).render('E404.hbs', {
                errorObject
            });
        };
        //handle multiple results
        if (body.response.results) {
            wxObject.q = id;
            wxObject.results = body.response.results;
            return res.status(200).render('query-results.hbs', {
                wxObject
            });
        };
        //assign JSON data to variable and pass variable to external functions to handle it
        currentData = body.current_observation;
        wxIcon = getWxIcon(currentData.icon, currentData.UV);
        wxObject = wxDetails(currentData);
        //render results to client's browser using returned object, CSS icon and template page
        return res.status(200).render('wx.hbs', {
            wxObject,
            wxIcon
        });
    });
};

var wxMetric = (req,res) => {
    //extract location ID from URL
    let id = req.params.id;
    request({
        url: `https://api.wunderground.com/api/${API_KEY}/conditions/q/${id}.json`,
        json: true
    }, (error, response, body) => {
        //render error page if there's a problem with response
        if (body.response.error) {
            errorObject = body.response.error;
            return res.status(404).render('E404.hbs', {
                errorObject
            });
        };
        //handle multiple results
        if (body.response.results) {
            wxObject.q = id;
            wxObject.results = body.response.results;
            return res.status(200).render('query-results.hbs', {
                wxObject
            });
        };
        //assign JSON data to variable and pass variable to external functions to handle it
        currentData = body.current_observation;
        wxIcon = getWxIcon(currentData.icon, currentData.UV);
        wxObject = wxDetails(currentData);
        //render results to client's browser using returned object, CSS icon and template page
        return res.status(200).render('wxm.hbs', {
            wxObject,
            wxIcon,
        });
    });
};

module.exports = {wxImperial, wxMetric};
