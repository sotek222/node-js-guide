const { getDB } =  require('../util/db');
const mongodb = require('mongodb');

class Product {
  constructor(title, price, imageUrl, description, userId, id){
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.userId = userId;
    this._id = id;
  }

  save(){
    // This var stores our connection to the DB 
    const db = getDB();
    // This method connects to a collection specified by a string
    // If it doesnt exist in the db it is created for us
    if(this._id){
      const objectId = new mongodb.ObjectID(this._id);
      
      
      console.log("found an id in the IF BLOCK");

      return db.collection('products')
      .updateOne(
        { _id: objectId },
        {
          $set: {
            title: this.title,
            price: this.price,
            description: this.description,
            imageUrl: this.imageUrl,
            userId: this.userId
          }
        }
      )
    } else {
      console.log("Did not have an id in the ELSE BLOCK");
      return db.collection('products')
       .insertOne(this)
       .then(result => console.log(result))
       .catch(err => {
         console.error("ERROR IN PRODUCT SAVE: ", error)
         throw err;
       });
    };
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

  static deleteById(id){
    const db = getDB();
    const objectId = new mongodb.ObjectID(id);

    return db.collection('products').deleteOne({ _id: objectId });
  }


};


module.exports = Product;