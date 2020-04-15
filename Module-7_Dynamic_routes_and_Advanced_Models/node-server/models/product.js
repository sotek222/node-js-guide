const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const Cart = require('./cart');


const getProductsFromFile = (cb) => {
  const p = path.join(rootDir, "data", 'products.json');
  fs.readFile(p, (err, content) => {
    if (err) {
      cb([], p);
    } else {
      cb(JSON.parse(content), p);
    };
  });
};

class Product {
  constructor(id, title, imageUrl, description, price){
    this.id = id;
    this.title = title; 
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(){
    getProductsFromFile((products, p) => {
      if (this.id) {
        const foundIndex = products.findIndex(product => product.id === this.id);
        products[foundIndex] = {...this};
      } else {
        const lastProd = products[products.length - 1];
  
        if(lastProd){
          const newId = parseInt(lastProd.id) + 1;
          this.id = newId.toString();
        } else {
          this.id = "1";
        };
  
        products.push(this);
      };
      fs.writeFile(p, 
        JSON.stringify(products), 
        (err) => err ? console.log("IN WRITE", err) : null);
    });
  }

  static delete(id){
    getProductsFromFile((products, p) => {
      const foundProduct = products.find(product => product.id === id);
      products = products.filter(product => product.id !== id);
      fs.writeFile(p,
        JSON.stringify(products),
        (err) => err ? console.log("IN WRITE", err) : null);
        Cart.deleteById(foundProduct.id, foundProduct.price);
      });
  }

  static fetchAll(cb){
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const foundProduct = products.find(product => product.id === id);
      cb(foundProduct);
    });
  }
}

module.exports = Product;
