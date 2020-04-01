// Node Core Modules:
const path = require('path');

// Routes:
const { products, routes: adminRoutes } = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Util Modules: 
const rootDir = require('./util/path');

// Express Modules:
const express = require('express');
const bodyParser = require('body-parser');
const expressHB = require('express-handlebars');

const app = express();

// Because express does not have built in support for handlebars 
// we have to set it up here. 
// the first argument can be anything you want
app.engine('handlebars', expressHB({layoutsDir: 'views/layouts', defaultLayout: 'main-layout'}));

// Here we tell express which view engine to use. 
// express has built-in support for pug
// app.set('view engine', 'pug');
app.set('view engine', 'handlebars');
// sets the views folder 
// first arg: is the key to set
// secodn arg: is the name of the directory to look for
app.set('views', 'views');

// Allows for serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use((req, resp, next) => {
  // resp.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
  resp.status(404).render('404', { pageTitle: '404' });
});

app.listen(3000);
