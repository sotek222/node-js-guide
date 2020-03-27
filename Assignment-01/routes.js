function htmlFiller(body, title){
  return (`
     <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title ? title : "Node Test"}</title>
        </head>
        <body>
          ${body ? body : "<h1>Nothing Found</h1>"}
        </body>
      </html>
  `);
};



const requestHandler = (req, resp) => {
  const { url, method, headers  } = req; 

  if(url === "/"){
    const indexHtml = htmlFiller(`
    <h1>Welcome to my Node JS test page!</h1>
    <div>
      <form action="/create-user" method="POST"> 
        <input type="text" name="username" placeholder="User's Name"/>
        <button type="submit">Submit User</button>
      </form>
      <p>JavaScript is usually run in the browser, 
      but now thanks to the power of Node.js 
      it can run as a server side language as well!!</p>
      <h3>Nothing can stop JavaScript!!!</h3>
      <a href="/users">Go to Users page</a>
    </div>
    `, "Node JS Index");

    resp.setHeader('Content-Type', "text/html");
    resp.write(indexHtml);
    return resp.end();
  };

  if(url === "/users"){
    const users = [
      "Matthew",
      "John",
      "Sam",
      "Rick",
      "Tristan",
      "Emily"
    ];

    const userHTML = htmlFiller(`
    <div>
      <h1>Users: </h1>
      <ul>
      ${users.map(user => `<li>${user}</li>`).join("")}
      </ul>
    </div>
    `, "Users");

    resp.write(userHTML);
    return resp.end();
  };
  
  if(url === "/create-user" && method === 'POST'){  
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const username = Buffer.concat(body).toString().split("=")[1];
      console.log(username);
      resp.statusCode = 302;
      resp.setHeader('Location', '/');
      return resp.end();
    });
  };
};

module.exports = requestHandler;