const Cart = require('../models/cart');
const Product = require('../models/product');
const CartItem = require('../models/cartItem');

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
        const totalPrice = products.reduce((acc, cv) => {
          return acc += cv.cartItem.quantity * cv.price;
        }, 0); 

        resp.render('shop/cart', {
          pageTitle: "Your Cart",
          path: "/cart",
          cartProducts: products,
          totalPrice
        });
      })
    })
    .catch(err => console.error("ERROR: ", err));
};

function postCart(req, resp, next){
  const { productId } = req.body;
  let fetchedCart;
  let newQuantity = 1;

  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({ where: { id: productId }});
  })
  .then(([product]) => {

    if(product){
      newQuantity += product.cartItem.quantity
      return product;
    };

    return Product.findByPk(productId)
  })
  .then(product => {
    return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
  })
  .then(data => resp.redirect('/cart'))
  .catch(err => console.error("ERROR HERE: ", err));
};

function deleteCartProduct(req, resp, next){
  const { productId } = req.params;

  req.user.getCart()
  .then(cart => {
    return cart.getProducts({ where: { id: id } })
  })
  .catch(err => console.error('ERROR: ', err));

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
