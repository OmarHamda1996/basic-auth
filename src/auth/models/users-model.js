const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../database/connection');

const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

Users.prototype.authenticate = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Users;
