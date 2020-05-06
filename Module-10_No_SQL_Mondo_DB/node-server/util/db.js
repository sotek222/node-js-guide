const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'lizardmen', {
    dialect: 'mysql',
    host: 'localhost'
  });

module.exports = sequelize;


// ---------- MYSQL without Sequelize SETUP ------------- // 

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-complete',
//   password: 'lizardmen'
// });

// module.exports = pool.promise();