var pkg = require('../../../package.json');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

if(!pkg.config) {
  console.error('Please setup config in package.json!');
}

app.use(cors());

app.disable('etag');

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 1000000
}));

app.get('/config.json', function(req, res) {
  var API_URL = process.env.API_URL;
  if(!API_URL) { res.sendStatus(500); }

  res.json(JSON.stringify({ apiUrl: API_URL+'api/' }));
});

var server = app.listen(pkg.config.apiPort || 8001, function() {
  var port = server.address().port;
  console.log('Server is listening on :%s', process.env.API_URL);
  console.log('Config route is listening at :%s', port);
});

module.exports = server;
