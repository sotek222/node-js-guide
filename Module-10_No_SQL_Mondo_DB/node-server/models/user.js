const { getDB } = require('../util/db');
const mongodb = require('mongodb');

class User {
  constructor(username, email, id, cart){
    this.username = username;
    this.email = email;
    this._id = id;
    this.cart = cart;
  }

  addToCart(product){
    const db = getDB();
    const objectId = new mongodb.ObjectID(this._id);
    const foundProdIndex = this.cart.items.findIndex(prod => {
      // we need to use the toString() method here because both id properties 
      // are treated as objects in this case
     return prod.productId.toString() === product._id.toString()
    });
    const updatedItems = [...this.cart.items];

    // If we dont find the item the return is -1
    if(foundProdIndex >= 0){
      updatedItems[foundProdIndex].quantity += 1;
    } else {
      updatedItems.push({ productId: new mongodb.ObjectID(product._id), quantity: 1 });
    };

    const updatedCart = {
      items: updatedItems
    };

    return db.collection('users')
      .updateOne(
        { _id: objectId },
        {
          $set: {
            cart: updatedCart
          }
        }
      )
  }

  save(){
    const db = getDB();

    return db.collection('users')
    .insertOne(this)
    .catch(err => console.error("ERROR IN USER SAVE: ", err));
  }

  static findById(id){
    const db = getDB();
    const objectId = new mongodb.ObjectID(id);

    return db.collection('users')
    .findOne({ _id: objectId })
    .catch(err => console.error("ERROR FINDING USER: ", err));
  }
};

module.exports = User;