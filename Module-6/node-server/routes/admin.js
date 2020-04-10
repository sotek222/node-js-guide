const Router = require('express').Router();
const { getAddProduct, postAddProduct, getProducts } = require('../controllers/admin');

// GET => Add Product
Router.get("/add-product", getAddProduct);

// POST => Add Product
Router.post("/add-product", postAddProduct);

// GET => Products List
Router.get("/products", getProducts);

module.exports = Router;