const Cart = require('../models/cart');
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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (const product of products) {
        const foundProduct = cart.products.find(prod => prod.id === product.id)
        if (foundProduct){
          cartProducts.push({ ...product, qty: foundProduct.qty});
        };
      };


      resp.render('shop/cart', {
        pageTitle: "Your Cart",
        path: "/cart",
        cart: cartProducts,
        totalPrice: cart.totalPrice
      });
    })
  });

};

function postCart(req, resp, next){
  const { productId } = req.body; 
  Product.findById(productId, product => {
    Cart.addProduct(product.id, product.price);
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
  getCheckout,
  getOrders,
  getProductDetails
};
