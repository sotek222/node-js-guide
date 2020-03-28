const Router = require('express').Router();

Router.get("/", (req, resp, next) => {
  resp.send("<h1>Hello from express!!</h1>");
});

module.exports = Router;