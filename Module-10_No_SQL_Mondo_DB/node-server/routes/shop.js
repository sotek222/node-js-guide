const Router = require('express').Router();
const { 
  getShopProducts, 
  getIndexProducts, 
  getProductDetails,
  getCart, 
  postCart,
  editCartProduct,
  deleteCartProduct,
  getCheckout, 
  postCheckout,
  getOrders } = require('../controllers/shop');

// GET => Index
Router.get("/", getShopProducts);
// GET => Products
Router.get("/products", getIndexProducts);

// GET => Cart
Router.get("/cart", getCart);

// POST => Cart
Router.post("/cart", postCart);

// POST => Edit Cart Quantity 
Router.post("/cart/:id/edit", editCartProduct);

// POST => delete Cart Item
Router.post("/cart/delete/:id", deleteCartProduct);

// GET => Checkout
Router.get("/checkout", getCheckout);

// GET => Orders
Router.get("/orders", getOrders);

// GET => Product Detail
Router.get("/products/:id", getProductDetails);

// POST => Checkout
Router.post("/checkout", postCheckout);


module.exports = Router;
