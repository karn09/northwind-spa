var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

module.exports = app;

var root = path.join(__dirname, '../');

app.use(bodyParser.json());
//are you using this? if not-- then why put it in?
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use('/api', require('./routes'));
app.use('/vendor', express.static(path.join(root, 'bower_components')));
app.use('/public', express.static(path.join(root, 'public')));

app.use(function(req, res, next) {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next(null);
  }
});

app.get('/', function(req, res) {
  console.log(app.get('/static'));
  res.sendFile(root + '/public/index.html');
});

app.use(function(err, req, res, next) {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});
