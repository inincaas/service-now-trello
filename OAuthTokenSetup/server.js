var connect = require('connect');
connect.createServer(
    connect.static(__dirname)
).listen(8080);
console.log('Server setup on port 8080');