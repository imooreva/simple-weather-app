var express = require('express');
var {wxImperial, wxMetric} = require('./route-callbacks.js');

//set up express
var router = express.Router();
//main page
router.route('/').get((req,res) => res.status(200).render('index.hbs'));

//requests imperial unit JSON data from wunderground's API and renders data to page
router.route('/wx/:id').get(wxImperial);

//requests metric unit JSON data from wunderground's API and renders data to page
router.route('/wxm/:id').get(wxMetric);

module.exports = router;
