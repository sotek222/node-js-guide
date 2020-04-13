const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

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
  constructor(title, imageUrl, description, price){
    this.title = title; 
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(){
    getProductsFromFile((products, p) => {
      products.push(this);
      fs.writeFile(p, 
        JSON.stringify(products), 
        (err) => err ? console.log("IN WRITE", err) : null);
    });
  }

  static fetchAll(cb){
    getProductsFromFile(cb);
  }
}

module.exports = Product;
