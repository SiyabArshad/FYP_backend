const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:adminadmin@localhost:3306/digischool');

const Admin = sequelize.define('Admin', {
    adminId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  sequelize.sync()
  .then(() => {
    console.log('Admin Schema created!');
  })
  .catch((error) => {
    console.log('Admin Schema failed!');   
});
  
  module.exports = Admin;