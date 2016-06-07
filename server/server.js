var https = require('https');
var sslConfig = require('./ssl-config');
var options = {
    key: sslConfig.privateKey,
      cert: sslConfig.certificate
};
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  server = https.createServer(options, app);
  server.listen(app.get('port'), function() {
    app.emit('started');
    //var baseUrl = 'https://' + app.get('url').replace(/\/$/, '');
    var baseUrl = 'https://' +  app.get('host') + ':' + app.get('port');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
  return server;
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
