const Product = require('../models/product');

function getAddProduct(req, resp, next) {
  resp.render('admin/add-product', { pageTitle: "Add Product", path: '/admin/add-product' });
};

function postAddProduct(req, resp, next) {
  const { title, image, description, price } = req.body;
  const product = new Product(title, image, description, price);
  product.save();
  resp.redirect('/')
}

function getProducts(req, resp, next) {
  Product.fetchAll((products) => {
    resp.render('shop/product-list', {
      products,
      pageTitle: 'Shop',
      shopActive: true,
      path: '/'
    });
  })
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
};