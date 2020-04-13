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
    resp.render('shop/products', {
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

function getOrders(req, resp, next) {
  resp.render('shop/orders', {
    path: "/orders",
    pageTitle: "Your Orders"
  })
};

function getProductDetails(req, resp, next){
  const { id } = req.params;
  Product.fetchAll(products => {
    const foundProduct = products.find(product => product.id === id);
    resp.render('shop/product-detail', {
      product: foundProduct,
      pageTitle: `${foundProduct.title} Details`,
      path: ""
    });
  });
};

module.exports = {
  getShopProducts,
  getIndexProducts,
  getCart,
  getCheckout,
  getOrders,
  getProductDetails
};
