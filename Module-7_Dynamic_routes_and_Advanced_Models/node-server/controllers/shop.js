
const Product = require('../models/product');
const cart = [];
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

function getProductDetails(req, resp, next){
  const { id } = req.params;
  Product.findById(id, product => {
    resp.render('shop/product-detail', {
      product,
      pageTitle: `${product.title} Details`,
      path: "/products"
    });
  });
};

function getCart(req, resp, next) {
  console.log("CART: ", cart);
  resp.render('shop/cart', {
    cart,
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

function postCart(req, resp, next){
  const { productId } = req.body; 
  Product.findById(productId, product => {
    cart.push(product);
    resp.redirect("/cart");
  })
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


module.exports = {
  getShopProducts,
  getIndexProducts,
  getCart,
  postCart,
  getCheckout,
  getOrders,
  getProductDetails
};
