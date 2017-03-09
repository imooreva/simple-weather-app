var express = require('express');
var path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000 //used for heroku

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(require('./routes.js'));

app.listen(port, () => console.log(`Server is up on port ${port}`));
