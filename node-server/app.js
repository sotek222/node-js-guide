const http = require('http');
const fs = require('fs');

console.log("Node Server Started");

function rqListener(req, resp) {
  const { method, headers, url } = req;

  if (url === '/') {
    resp.setHeader('Content-Type', 'text/html');
    resp.write(`
      <html>
        <head>
          <title>MY NODE PAGE</title>
        </head>
        <body>
         <form action="/message" method="POST">
            <input type="text" name="message">
            <button type="submit">Send</button>
          </form>
        </body>
      </html>`);
    return resp.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];

    console.log("POST");

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync(`./text_files/${message}.txt`, message);
    });

    resp.statusCode = 302;
    resp.setHeader('Location', '/');
    return resp.end()
  };

  resp.setHeader('Content-Type', 'text/html');
  resp.write(`
      <html>
        <head>
          <title>MY NODE PAGE</title>
        </head>
        <body>
          <h1>Form Submitted</h1>
        </body>
      </html>`);
  resp.end();
};



const server = http.createServer(rqListener);

server.listen(3000);
