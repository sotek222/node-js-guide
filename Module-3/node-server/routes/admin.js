const Router = require('express').Router();
const htmlFiller = require('../helper');

Router.get("/add-product", (req, resp, next) => {
  resp.send(htmlFiller(`
    <h1>Add a Product</h1>
    <form action="/admin/product" method="POST">
      <input type="text" name="product"/>
      <button type="submit">Submit a Product</button>
    </form>
  `));
});

Router.post("/product", (req, resp, next) => {
  console.log(req.body);
  resp.redirect('/')
});

module.exports = Router;