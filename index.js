var express = require('express');
var app = express();

app.use(express.static('.'));

app.get('/', function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });
});

app.listen(3000);
