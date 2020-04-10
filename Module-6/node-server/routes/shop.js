const Router = require('express').Router();
const { getShopProducts, getIndexProducts, getCart, getCheckout } = require('../controllers/shop');

// GET => Index
Router.get("/", getShopProducts);
// GET => Products
Router.get("/products", getIndexProducts);

// GET => Cart
Router.get("/cart", getCart);

// GET => Checkout
Router.get("/checkout", getCheckout);

module.exports = Router;
