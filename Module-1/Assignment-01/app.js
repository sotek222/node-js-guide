const http = require('http');
const routes = require('./routes');

console.log("Node Server Started Successfully");
const server = http.createServer(routes);

server.listen(3000);