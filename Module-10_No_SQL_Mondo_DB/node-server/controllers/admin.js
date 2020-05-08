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
  const product = new Product(title, price, imageUrl, description);
  product.save()
  .then(result => resp.redirect('/admin/products'))
  .catch(err => console.errror("ERROR: ", err));
};

function getProducts(req, resp, next) {
  Product.fetchAll()
  .then(products => {
    resp.render('admin/products', {
      products,
      pageTitle: "Admin Products",
      path: "/admin/products"
    });
  })
  .catch(err => console.error("ERROR IN ADMIN GET PRODUCTS: ", err));
};

function getEditProduct(req, resp, next){
  const { productId } = req.params;
  const editMode = req.query.edit;

  if(!editMode){
    resp.redirect('/');
  };

  Product.findById(productId)
  .then(product => {
    resp.render('admin/product-form', {
      product,
      pageTitle: `Edit ${product.title}`,
      path: "/edit-product",
      editing: editMode
    })
  });
};

function postEditProduct(req, resp, next){
  const { id } = req.params;
  const { title, price, imageUrl, description } = req.body;
  Product.findById(id)
  .then(foundProd => {
    const product = new Product(title, price, imageUrl, description, foundProd._id);
    return product.save();
  })
  .then(result => {
    resp.redirect('/admin/products');
  })
};
  
  function deleteProduct(req, resp, next){
    const { id } = req.params;
    Product.deleteById(id)
    .then(result => resp.redirect('/admin/products'))
    .catch(err => console.error("ERROR", err));
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct
}