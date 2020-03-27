const fs = require('fs');

function requestHander(req, resp){
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
  };
  
  if (url === '/message' && method === 'POST') {
    const body = [];
  
    req.on('data', (chunk) => {
      body.push(chunk);
    });
  
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile(`./text_files/${message}.txt`, message, (err) => {
        if (!err) {
          console.log('Success');
          resp.statusCode = 302;
          resp.setHeader('Location', '/');
          return resp.end()
        };
      });
    });
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

module.exports = requestHander;