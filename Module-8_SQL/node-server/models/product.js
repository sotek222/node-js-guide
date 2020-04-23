// const fs = require('fs');
// const path = require('path');
// const rootDir = require('../util/path');
const Cart = require('./cart');
const dbConnector = require('../util/db');

class Product {
  constructor(id, title, imageUrl, description, price){
    this.id = id;
    this.title = title; 
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(){
    return dbConnector.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', 
    [this.title, this.price, this.imageUrl, this.description]);
  }

  static delete(id){

  }

  static fetchAll(){
    return dbConnector.execute('SELECT * FROM products')
  }

  static findById(id){
    return dbConnector.execute('SELECT * FROM products WHERE id = ?', [id]);
  }
}

module.exports = Product;
