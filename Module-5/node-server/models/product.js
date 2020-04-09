const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

class Product {
  constructor(title, image, description, price){
    this.title = title; 
    this.image = image;
    this.description = description;
    this.price = price;
  }

  save(){
    const p = path.join(rootDir, "data", 'products.json');
    fs.readFile(p, (err, content) => {
      let products = [];

      if (!err) {
        products = JSON.parse(content);
      };

      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => err ? console.log("IN WRITE", err) : null);
    });
  }

  static fetchAll(cb){
    const p = path.join(rootDir, "data", 'products.json');
    fs.readFile(p, (err, content) => {
      if(err){
          cb([]);
        };
        
        cb(JSON.parse(content));
      });
  }

}

module.exports = Product;
