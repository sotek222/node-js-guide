const Router = require('express').Router();
const { 
  getAddProduct, 
  postAddProduct, 
  getProducts, 
  getEditProduct,
  postEditProduct } = require('../controllers/admin');

// GET => Add Product
Router.get("/add-product", getAddProduct);

// POST => Add Product
Router.post("/add-product", postAddProduct);

// GET => Products List
Router.get("/products", getProducts);

// GET => Product edit form
Router.get("/edit-product/:id", getEditProduct)

// POST => Product edit
Router.post("/edit-product/:id", postEditProduct);

module.exports = Router;