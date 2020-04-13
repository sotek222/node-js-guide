// Node Core Modules:
const path = require('path');

// Routes:
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Util Modules: 
const rootDir = require('./util/path');

// Express Modules:
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Allows for serving static files
app.use(express.static(path.join(__dirname, 'public')));

console.log("Express Server Started");
app.use(bodyParser.urlencoded({extended: false}))
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, resp, next) => {
  resp.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})
app.listen(3000);
