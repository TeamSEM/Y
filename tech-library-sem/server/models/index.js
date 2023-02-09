const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Users = sequelize.define('users', {
  name: Sequelize.STRING,
  password: Sequelize.STRING
})
//item to cart association
// Users.hasOne(Cart);
// Cart.belongsTo(Users);
// Cart.hasMany(Items);
// Items.belongsTo(Cart);
//Users.hasOne(Cart)

module.exports = {
  db: sequelize,
//   Sauce,
//   Items,
  Users,
//   Cart
};