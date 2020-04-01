const path = require('path');
const rootDir = require('../util/path');
const Router = require('express').Router();
const { products } = require('./admin');

Router.get("/", (req, resp, next) => {
  // Here we are sending an html document which the browser will use immediately 
  // resp.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // render is used instead of send file here, becuase we are sending
  // a .pug template which will then become html 
  resp.render('shop', { 
    products, 
    pageTitle: 'Shop', 
    shopActive: true, 
    hasProducts: products.length > 0,
    formsCSS: true,
    productsCSS: true
  });
});

module.exports = Router;
