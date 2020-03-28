const express = require('express');

const app = express();

app.use("/users", (req, resp, next) => {
  const users = [
    {name: "Matt", age: 27},
    {name: "John", age: 33},
    {name: "Calvin", age: 7},
    {name: "Jack", age: 1},
    {name: "Samantha", age: 24}
  ];
  resp.send(users);
});

app.use("/", (req, resp, next) => {
  resp.send("<h1>Welcome to Node with Express!!!</h1>");
});


// app.use((req, resp, next) => {
//   console.log("Received in first middleware sending to next middleware...");
//   next();
// });

// app.use((req, resp, next) => {
//   console.log("In next middleware sending response now!");
//   resp.send('<h1>Request processed by Express!!!</h1>');
// });

app.listen(3000);