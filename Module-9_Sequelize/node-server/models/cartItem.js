const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;