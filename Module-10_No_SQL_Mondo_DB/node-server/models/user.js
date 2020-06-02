const { getDB } = require('../util/db');
const mongodb = require('mongodb');

class User {
  constructor(username, email, id){
    this.username = username;
    this.email = email;
    this._id = id;
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