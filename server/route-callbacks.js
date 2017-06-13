//API key is .gitignore'd :)
const {API_KEY} = require('./api_key.js');

//require modules and external functions
var hbs = require('hbs');
var request = require('request');
var {wxDetails, getWxIcon} = require('./wx-functions.js');

//declare variables for later use
var currentData, currentLocation, wxIcon, errorObject;
var wxObject = {};
var wxQueryResults = {};

var wxRoute = (req,res) => {
    //path determines what template page to render
    let rt = req.route.path.split('/')[1];
    let templatePage = `${rt}.hbs`;
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
            //generate a link for each location; response.results.zmw only works for U.S. stations when passed into URL apparently
            wxQueryResults.results.forEach((i) => i.apphref = `/${rt}/zmw:${i.zmw}`);
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

var getGeo = (req,res) => {
    //get user's IP address    
    //line below sourced from http://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node/19524949#19524949
    let IpAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    IpAddress = IpAddress.split(',')[0];
    let rt = req.route.path.slice(2);
    
    //use IP for geolocation and redirect to specified route with coordinates
    request({
        url: `http://ip-api.com/json/${IpAddress}?fields=226`,
        json: true
    }, (error, response, body) => {
        if (error || body.message) {
            errorObject = {
                type: 'geolocation failed',
                description: 'Unable to determine location.'
            };
            return res.status(404).render('E404.hbs', {
                errorObject
            });
        };
        return res.redirect(`/${rt}/${body.lat},${body.lon}`);    
    });
};

module.exports = {wxRoute, getGeo};
