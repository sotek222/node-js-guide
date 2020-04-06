const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/mainRoutes');
const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

server.set('view engine', 'pug');

server.use(routes);

server.use((req, resp, _) => {
  resp.status(404).render('404');
});

server.listen(3000);