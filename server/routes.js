var express = require('express');
var wxRoute = require('./route-callbacks.js');

//set up express
var router = express.Router();

//main page
router.route('/').get((req,res) => res.status(200).render('index.hbs'));

//requests imperial unit JSON data from wunderground's API and renders data to page
router.route('/wx/:id').get(wxRoute);

//requests metric unit JSON data from wunderground's API and renders data to page
router.route('/wxm/:id').get(wxRoute);

module.exports = router;
