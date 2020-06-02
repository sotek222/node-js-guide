const User = require('./models/user');

// environment variables
require('dotenv').config();

// Mongo connection 
const { mongoConnect } = require('./util/db');

// Node Core Modules:
const path = require('path');

// Routes:
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const resourceNotFound = require('./controllers/error');
const rootDir = require('./util/path');

// Express Modules:
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Allows for serving static files
app.use(express.static(path.join(rootDir, 'public')));
// Parses all incoming requests with a body, and returns a parsed request.
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, resp, next) => {
  User.findById("5eb9b6ccda23ecadea5f279e")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.error("ERROR: ", err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(resourceNotFound);

mongoConnect(() => {
  app.listen(3000);
})

