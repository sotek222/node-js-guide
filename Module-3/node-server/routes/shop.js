const path = require('path');
const rootDir = require('../util/path');
const Router = require('express').Router();

Router.get("/", (req, resp, next) => {
  resp.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = Router;
