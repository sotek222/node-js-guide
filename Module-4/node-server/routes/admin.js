const Router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');

const products = [];

Router.get("/add-product", (req, resp, next) => {
  // resp.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  resp.render('add-product', { docTitle: "Add Product" });
});

Router.post("/add-product", (req, resp, next) => {
  const { title, image, description, price } = req.body;
  products.push({ title, image, description, price });
  resp.redirect('/')
});

exports.routes = Router;
exports.products = products;