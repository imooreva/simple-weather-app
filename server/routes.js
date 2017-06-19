var express = require('express');
var {wxRoute, getGeo} = require('./route-callbacks.js');

//set up express
var router = express.Router();

//main page
router.route('/').get((req,res) => res.status(200).render('index.hbs'));

//requests imperial unit JSON data from wunderground's API and renders data to page
router.route('/wx/:id').get(wxRoute);

//requests metric unit JSON data from wunderground's API and renders data to page
router.route('/wxm/:id').get(wxRoute);

//routes for geolocation-based results
router.route('/gwx').get(getGeo);
router.route('/gwxm').get(getGeo);

//handle console error by sending 'No Content' 204 status
router.route('/favicon.ico').get((req, res) => res.sendStatus(204));

module.exports = router;
