const Product = require('../models/product');

// Shop Controllers:
function getIndexProducts(req, resp, next) {
  Product.fetchAll(products => {
    resp.render('shop/index', {
      products,
      path: "/products",
      pageTitle: "Index"
    });
  })
};

function getShopProducts(req, resp, next) {
  Product.fetchAll(products => {
    resp.render('shop/product-list', {
      products,
      pageTitle: "Shop",
      path: "/"
    });
  });
};

function getCart(req, resp, next) {
  resp.render('shop/cart', {
    pageTitle: "Your Cart",
    path: "/cart"
  });
};

function getCheckout(req, resp, next) {
  resp.render('shop/checkout', {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};

module.exports = {
  getShopProducts,
  getIndexProducts,
  getCart,
  getCheckout
};