const express = require('express');
const rootDir = require('./util/path');
const path = require('path');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

const app = express();

// console.log("Express Server Started");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

app.use(indexRoutes);
app.use(userRoutes);
app.use((req, resp, next) => {
  console.log("404");
  resp.sendFile(path.join(rootDir, 'views', '404.html'));
})
app.listen(3000);


