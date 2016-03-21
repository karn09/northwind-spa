var Promise = require('bluebird');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/northwind-spa').connection;

require('./models');

var startDbPromise = new Promise(function (resolve, reject) {
  db.on('open', resolve);
  db.on('error', reject);
});

startDbPromise.then(function() {
  console.log('Connecting to db');
});

module.exports = startDbPromise;
