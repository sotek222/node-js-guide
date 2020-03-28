const http = require('http');
const routes = require('./routes');

console.log("Node Server Started");
const server = http.createServer(routes);

server.listen(3000);
