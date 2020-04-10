const Product = require('../models/product');

// Admin Controllers:
function getAddProduct(req, resp, next) {
  resp.render('admin/add-product', {
    pageTitle: "Add Product",
    path: "/admin/add-product"
  });
};

function postAddProduct(req, resp, next) {
  const { title, image, description, price } = req.body;
  const product = new Product(title, image, description, price);
  product.save();
  resp.redirect('/');
};

function getProducts(req, resp, next) {
  Product.fetchAll(products => {
    resp.render('admin/products', {
      products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  });
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts
}