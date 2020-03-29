const Router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');

Router.get("/add-product", (req, resp, next) => {
  resp.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

Router.post("/product", (req, resp, next) => {
  console.log(req.body);
  resp.redirect('/')
});

module.exports = Router;