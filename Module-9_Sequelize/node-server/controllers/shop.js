const Cart = require('../models/cart');
const Product = require('../models/product');
// Shop Controllers:
function getIndexProducts(req, resp, next) {
  Product.fetchAll()
   .then(([rows, fieldData]) => {
      resp.render('shop/index', {
        products: rows,
        path: "/products",
        pageTitle: "Index"
      });

   })
   .catch(err => console.error("ERROR:", err));
};

function getShopProducts(req, resp, next) {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    resp.render('shop/products', {
      products: rows,
      pageTitle: "Shop",
      path: "/"
    });
  })
  .catch(err => console.error(err));
};

function getProductDetails(req, resp, next){
  const { id } = req.params;
  Product.findById(id)
    .then(([[product]]) => {
      resp.render('shop/product-detail', {
        product,
        pageTitle: `${product.title} Details`,
        path: "/products"
      });
    })
    .catch(err => console.error(err));
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
