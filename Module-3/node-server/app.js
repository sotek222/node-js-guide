const htmlFiller = require('./helper');

// Routes:
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Express Modules:
const express = require('express');
const bodyParser = require('body-parser');



const app = express();
console.log("Express Server Started");

app.use(bodyParser.urlencoded({extended: false}))
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use((req, resp, next) => {
  resp.status(404).send(htmlFiller('<div><h1>404 Not Found</h1></div>', '404'))
})
app.listen(3000);
