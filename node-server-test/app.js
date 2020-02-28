const http = require('http');


function rqListener(req, resp){
  console.log("REQUEST", req);
};

const server = http.createServer(rqListener);

server.listen(3000);