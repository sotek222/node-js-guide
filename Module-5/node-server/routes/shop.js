const Router = require('express').Router();
const { getProducts } = require('../controllers/product');

Router.get("/", getProducts);

module.exports = Router;
