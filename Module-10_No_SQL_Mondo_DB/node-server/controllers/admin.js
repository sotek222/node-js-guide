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
  .then(result => {

  });

  // Product.build is the same as new Product()
  // to then save it in the db we'd have to also call .save();
  // Product.create does both build and save
  // Product.create({ title, price, imageUrl, description, userId: req.user.id })

  // createProduct is created by sequelize using the associations created before
  // req.user.createProduct({ title, price, imageUrl, description})
  // .then(() => resp.redirect('/admin/products'))
  // .catch(err => console.errror("ERROR: ", err));
};

function getProducts(req, resp, next) {
  // Product.findAll()
  // req.user.getProducts()
  // .then(products => {
  //   resp.render('admin/products', {
  //     products,
  //     pageTitle: "Admin Products",
  //     path: "/admin/products"
  //   });
  // })
  // .catch(err => console.error("ERROR: ", err));
};

function getEditProduct(req, resp, next){
  // const { productId } = req.params;
  // const editMode = req.query.edit;

  // if(!editMode){
  //   resp.redirect('/');
  // };

  // // Product.findByPk(id)
  // req.user.getProducts({where: { id: productId }})
  //   .then(([product]) => {
  //     resp.render('admin/product-form', {
  //       product,
  //       pageTitle: `Edit ${product.title}`,
  //       path: "/edit-product",
  //       editing: editMode
  //     })
  //   });
};

function postEditProduct(req, resp, next){
  // const { id } = req.params;
  // const { title, imageUrl, description, price } = req.body;
  // Product.findByPk(id)
  //   .then(product => {
  //     product.title = title;
  //     product.price = price;
  //     product.imageUrl = imageUrl;
  //     product.description = description;

  //     return product.save()
  //   })
  //   .then(() => resp.redirect('/admin/products'))
  //   .catch(err => console.error("ERROR", err));
  };
  
  function deleteProduct(req, resp, next){
    // const { id } = req.params;
    // Product.findByPk(id)
    // .then(product => {
    //   return product.destroy();
    // })
    // .then(() => resp.redirect('/admin/products'))
    // .catch(err => console.error("ERROR", err));
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct
}