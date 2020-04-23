// Database
const sequelize = require('./util/db');

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(resourceNotFound);

// This look at any models in the program
// that use the define method and checks to see if the 
// corresponding table exists and if it doesnt creates it
sequelize
  .sync()
  .then(result => app.listen(3000))
  .catch(err => console.error("ERROR: ", err));


