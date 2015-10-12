'use strict';

var port = 4000;

var http = require('http');
var path = require('path');
var fs = require('fs');

var writeObject = require('./write-object.js');
var getBrowser = require('./get-browser.js');
var mimeTypes = {
  '.js': 'text/javascript',
};

var html = fs.readFileSync('browser-version.html').toString();
//var buffWriteObject = fs.readFileSync('write-object.js');

var strServer = '<h2>Server</h2>';
var rexServer = new RegExp(strServer);

var cache = {};

function getFileType(file) {
  var period = file.lastIndexOf('.');
  if (period < 0) return '';
  return file.slice(period);
}

var server = http.createServer(function (req, res) {
  var fileType = getFileType(req.url);
  for (var ft in mimeTypes) {
    if (fileType === ft) {
      //res.writeHead(200, {'Content-Type': mimeTypes[ft]});
      res.statusCode = 200;
      res.setHeader('content-type', mimeTypes[ft]);
      if (req.url in cache && cache[req.url].loaded) {
        res.setHeader('cache-control', 'max-age=60; public');
        if (!cache[req.url].content) return res.statusCode = 404, res.end();
        return res.end(cache[req.url].content);
      }
      var fileName = path.resolve(__dirname, req.url.slice(1));
      if (!(req.url in cache)) {
        cache[req.url] = {loaded: false, content: null};
        fs.readFile(fileName, function (err, content) {
          cache[req.url].loaded = true;
          res.setHeader('cache-control', 'max-age=60; public');
          if (err) return res.statusCode = 404, res.end();
          cache[req.url].content = content;
          return res.end(cache[req.url].content);
        });
      }
      //return fs.createReadStream(fileName).pipe(res);
      return;
    } // if
  } // for ft in mimeTypes

  res.writeHead(200, {'Content-Type': 'text/html'});

  var document = { str: strServer,
    write: function (s) { this.str += s; },
    toString: function () { return this.str; },
  };

  document.write('<pre>getBrowser(userAgent) = ' + getBrowser(req.headers['user-agent']) + '\n\n' +
    writeObject('req', req) + '\n' +
    writeObject('res', res) + '\n' +
    writeObject('req.headers', req.headers) + '\n</pre>\n');

  res.end(html.replace(rexServer, document + ''));
});

server.listen(port, function () {
  console.log('Server running at http://localhost:' + port);
});

console.log('Server starting at http://localhost:' + port);
