const Router = require('express').Router();
const { getAddProduct, postAddProduct } = require('../controllers/product');


Router.get("/add-product", getAddProduct);

Router.post("/add-product", postAddProduct);

module.exports = Router;