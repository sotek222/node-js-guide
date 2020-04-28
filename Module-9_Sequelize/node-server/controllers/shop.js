const Cart = require('../models/cart');
const Product = require('../models/product');
// Shop Controllers:
function getIndexProducts(req, resp, next) {
  Product.findAll()
    .then(products => {
      resp.render('shop/index', {
        products,
        path: "/products",
        pageTitle: "Index"
      });
    })
    .catch(err => console.error("ERROR: ", err));
};

function getShopProducts(req, resp, next) {
  Product.findAll()
  .then(products => {
    resp.render('shop/products', {
      products,
      pageTitle: "Shop",
      path: "/"
    });
  })
  .catch(err => console.error(err));
};

function getProductDetails(req, resp, next){
  const { id } = req.params;
  Product.findByPk(id)
    .then((product) => {
      resp.render('shop/product-detail', {
        product,
        pageTitle: `${product.title} Details`,
        path: "/products"
      });
    })
    .catch(err => console.error(err));
};

function getCart(req, resp, next) {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts()
      .then(products => {
        console.log("PRODS: ", products);
        // resp.render('shop/cart', {
        //   pageTitle: "Your Cart",
        //   path: "/cart",
        //   cartProducts: products,
        //   totalPrice: 0
        //   // TODO: make sure to add the total price dynamically
        // });
      })
    })
    .catch(err => console.error("ERROR: ", err));
};

function postCart(req, resp, next){
  const { productId } = req.body; 
  Product.findById(productId, product => {
    Cart.addProduct(product.id, product.price);
    resp.redirect('/cart');
  });
};

function deleteCartProduct(req, resp, next){
  const { id } = req.params;
  Product.findById(id, foundProduct => {
    Cart.deleteById(id, foundProduct.price);
    resp.redirect('/cart');
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


module.exports = {
  getShopProducts,
  getIndexProducts,
  getCart,
  postCart,
  deleteCartProduct,
  getCheckout,
  getOrders,
  getProductDetails
};
