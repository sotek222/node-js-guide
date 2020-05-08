const { getDB } =  require('../util/db');
const mongodb = require('mongodb');

class Product {
  constructor(title, price, imageUrl, description){
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save(){
    // This var stores our connection to the DB 
    const db = getDB();
    // This method connects to a collection specified by a string
    // If it doesnt exist in the db it is created for us
   return db.collection('products')
    .insertOne(this)
    .then(result => console.log(result))
    .catch(err => {
      console.error("ERROR IN PRODUCT SAVE: ", error)
      throw err;
    });
  }

  static fetchAll(){
    const db = getDB();

    // invoking find with no args queries for all documents in a collection
    return db.collection('products')
    .find()
    // be cautious calling toArray on return value of find 
    // find can return thousands of documents
    .toArray()
    .then(products => {
      return products;
    })
    .catch(err => console.error("ERROR IN FETCH ALL:", err));
  }

  static findById(id){
    const db = getDB();
    const objectId = new mongodb.ObjectID(id);

    return db.collection('products').findOne({ _id: objectId })
  }

};


module.exports = Product;