const products = [];

function getAddProduct(req, resp, next) {
  resp.render('add-product', { pageTitle: "Add Product", path: '/admin/add-product' });
};

function postAddProduct(req, resp, next) {
  const { title, image, description, price } = req.body;
  products.push({ title, image, description, price });
  resp.redirect('/')
}

function getProducts(req, resp, next) {
  resp.render('shop', {
    products,
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