const Sequelize = require('sequelize');

const sequelize = require('../util/db');

// the sequelize variable contains all of the connection 
// pools and other resources from sequelize and mysql
// the define method allows us to define a model in our program and 
// a table in the DB.
const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;