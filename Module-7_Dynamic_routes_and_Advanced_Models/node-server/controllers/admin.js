const Product = require('../models/product');

// Admin Controllers:
function getAddProduct(req, resp, next) {
  resp.render('admin/product-form', {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

function postAddProduct(req, resp, next) {
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
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

function getEditProduct(req, resp, next){
  const { id } = req.params;
  Product.findById(id, product => {
    resp.render('admin/product-form', {
      product,
      pageTitle: `Edit ${product.title}`,
      path: "/edit-product",
      editing: true
    })
  });

};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct
}