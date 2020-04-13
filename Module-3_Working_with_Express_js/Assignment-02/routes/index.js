const Router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');

Router.get('/', (req, resp, next) => {
  resp.sendFile(path.join(rootDir, 'views', 'index.html'));
});

module.exports = Router;