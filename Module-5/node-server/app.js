// Node Core Modules:
const path = require('path');

// Routes:
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Express Modules:
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Allows for serving static files
app.use(express.static(path.join(__dirname, 'public')));
// Parses all incoming requests with a body, and returns a parsed request.
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, resp, next) => {
  resp.status(404).render('404', { pageTitle: '404' });
});

app.listen(3000);
