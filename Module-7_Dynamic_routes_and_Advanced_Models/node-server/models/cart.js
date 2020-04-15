const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const p = path.join(rootDir, 'data', 'cart.json');

class Cart {
  static addProduct(id, productPrice){
    // We don't really want to make multiple instances of the cart so 
    // we create just a class with static methods
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if(!err){
        cart = JSON.parse(fileContent) 
      };

      const existingProduct = cart.products.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        cart.products = [...cart.products, { id: id, qty: 1 }];
      };

      cart.totalPrice = parseInt(cart.totalPrice) + parseInt(productPrice);
      
      fs.writeFile(p, JSON.stringify(cart), err => console.log("ERROR:", err));
    });
  }

  static deleteById(id, price){
    fs.readFile(p, (err, fileContent) => {
      // in case we dont find a cart
      if(err){
        return;
      } else {
        const cart = JSON.parse(fileContent);
        const productToBeDeleted = cart.products.find(product => product.id === id);
        const amountToSubtract = productToBeDeleted.qty * price;
        cart.totalPrice = cart.totalPrice - amountToSubtract;
        cart.products = cart.products.filter(product => product.id !== id);
        fs.writeFile(p, JSON.stringify(cart), err => console.log("ERROR: ", err));
      };
    });
  }

  static getCart(cb){
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      cb(cart);
    });
  }


}

module.exports = Cart;