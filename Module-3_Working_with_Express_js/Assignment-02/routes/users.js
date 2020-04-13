const Router = require('express').Router();

const path = require('path');

const rootDir = require('../util/path');

Router.get('/users', (req, resp, next) => {
  resp.sendFile(path.join(rootDir, 'views', 'users.html'));
});

module.exports = Router;