const Product = require('../models/product');

function getAddProduct(req, resp, next) {
  resp.render('add-product', { pageTitle: "Add Product", path: '/admin/add-product' });
};

function postAddProduct(req, resp, next) {
  const { title, image, description, price } = req.body;
  const product = new Product(title, image, description, price);
  product.save();
  resp.redirect('/')
}

function getProducts(req, resp, next) {
  resp.render('shop', {
    products: Product.fetchAll(),
    pageTitle: 'Shop',
    shopActive: true,
    path: '/'
  });
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
};