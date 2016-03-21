var startDb = require('./db');
var server = require('http').createServer();
var createApp = function() {
  var app = require('./main.js');
  server.on('request', app);
};

var startServer = function() {
    var PORT = process.env.PORT || 3000;
    server.listen(PORT, function() {
      console.log('server started on ' + PORT);
    });
};

startDb
  .then(createApp)
  .then(startServer)
  .catch(function(err) {
    console.error(err, process.pid);
  });
