const Router = require('express').Router();
const { 
  getShopProducts, 
  getIndexProducts, 
  getProductDetails,
  getCart, 
  postCart,
  getCheckout, 
  getOrders } = require('../controllers/shop');

// GET => Index
Router.get("/", getShopProducts);
// GET => Products
Router.get("/products", getIndexProducts);

// GET => Cart
Router.get("/cart", getCart);

// POST => Cart
Router.post("/cart", postCart);

// GET => Checkout
Router.get("/checkout", getCheckout);

// GET => Orders
Router.get("/orders", getOrders);

// GET => Product Detail
Router.get("/products/:id", getProductDetails);


module.exports = Router;
