var express = require('express');
var path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000 //used for heroku

var app = express();

//configure express app and start listening
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(require('./routes.js'));
if (!module.parent) { app.listen(port, () => console.log(`Started up on port ${port}`)) };

module.exports = {app};