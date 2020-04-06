const Router = require('express').Router();
const users = require('../utils/users');

Router.get('/', (req, resp, _) => {
  resp.render('index');
});

Router.get('/users', (req, resp, _) => {
  resp.render('users', { users: users });
});

Router.post("/users", (req, resp, _) => {
  const name = req.body.name;
  users.push(name);
  resp.redirect('/users');
})


module.exports = Router;