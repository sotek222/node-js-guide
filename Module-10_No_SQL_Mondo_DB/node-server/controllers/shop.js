const Product = require('../models/product');

// Shop Controllers:
function getIndexProducts(req, resp, next) {
  Product.fetchAll()
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
  Product.fetchAll()
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
  Product.findById(id)
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
  .then(products => {
    const totalPrice = Math.round(products.reduce((acc, cv) => {
      return acc += cv.quantity * cv.price;
    }, 0)); 

    resp.render('shop/cart', {
      pageTitle: "Your Cart",
      path: "/cart",
      cartProducts: products,
      totalPrice
    });

  }).catch(err => console.error("ERROR: ", err));
};

function postCart(req, resp, next){
  const { productId } = req.body;
  Product
  .findById(productId)
  .then(product => req.user.addToCart(product))
  .then(result => resp.redirect('/cart'))
};

function editCartProduct(req, resp, next){

  const { id } = req.params;
  const quantity  = parseInt(req.body.quantity);

  const foundItem = req.user.cart.items.find(item => item.productId.toString() === id);

  if(quantity <= 0){
    req.user.removeFromCart(id)
    .then(result => resp.redirect('/cart'))
    .catch(err => console.error('ERROR: ', err));
  } else {
    foundItem.quantity = quantity;
    req.user.save()
    .then(result => resp.redirect('/cart'))
    .catch(err => console.error('ERROR: ', err));
  }

};

function deleteCartProduct(req, resp, next){
  const { productId } = req.params;
  req.user.removeFromCart(productId)
  .then(result => resp.redirect('/cart'))
  .catch(err => console.error('ERROR: ', err));
};  

function getOrders(req, resp, next) {
  req.user.getOrders()
  .then(orders => {
    resp.render('shop/orders', {
      orders,
      path: "/orders",
      pageTitle: "Your Orders"
    })
  })
  .catch(err => console.error("ERROR IN GET ORDERS: ", err));
};

function postCheckout(req, resp, next){
  const totalPrice = parseInt(req.body.totalPrice);

  req.user.addOrder(totalPrice)
  .then(result => resp.redirect('/orders'))
  .catch(err => console.error("ERROR POSTING ORDER: ", err));
};

module.exports = {
  getShopProducts,
  getIndexProducts,
  getCart,
  postCart,
  editCartProduct,
  deleteCartProduct,
  getOrders,
  getProductDetails,
  postCheckout
};
