const Product = require('../models/product');

// Admin Controllers:
function getAddProduct(req, resp, next) {
  resp.render('admin/add-product', {
    pageTitle: "Add Product",
    path: "/admin/add-product"
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
  Product.fetchAll(products => {
    const foundProduct = products.find(product => product.id === id);
    resp.render('admin/edit-product', {
      product: foundProduct,
      pageTitle: `Edit ${foundProduct.title}`,
      path: "/edit-product"
    })
  });

};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct
}