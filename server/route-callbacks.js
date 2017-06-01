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
var wxQueryResults = {};

var wxRoute = (req,res) => {
    //path determines what template page to render
    let templatePage = req.route.path.split('/')[1] + '.hbs';
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
            wxQueryResults.q = id;
            wxQueryResults.results = body.response.results;
            return res.status(200).render('query-results.hbs', {
                wxQueryResults
            });
        };
        //assign JSON data to variable and pass variable to external functions to handle it
        currentData = body.current_observation;
        wxIcon = getWxIcon(currentData.icon, currentData.UV);
        wxObject = wxDetails(currentData);
        //render results to client's browser using returned object, CSS icon and page template
        return res.status(200).render(templatePage, {
            wxObject,
            wxIcon
        });
    });
};

module.exports = wxRoute;
