const { getDB } =  require('../util/db');

class Product {
  constructor(title, price, imageUrl, description){
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save(){
    // This var store our connection to the DB 
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
};

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER, 
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;