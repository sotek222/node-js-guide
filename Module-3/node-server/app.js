// Express Modules
const express = require('express');

console.log("Express Server Started");
const app = express();

app.use((req, resp, next) => {
  console.log("In Middleware");
  next();
});
app.use((req, resp, next) => {
  console.log("In next Middleware");
  resp.send("<h1>Hello from express!!</h1>");
});

app.listen(3000);
