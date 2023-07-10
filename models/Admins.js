const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root:adminadmin@localhost:3306/digischool");
const Users=require("./Users")
const Admins=sequelize.define("admins",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
    },
    phone:{
        type:DataTypes.STRING,
    },
    address:{
        type:DataTypes.STRING,
    }
})
Admins.belongsTo(Users, { foreignKey: 'userId', foreignKeyConstraint: true }); 

sequelize.sync()
.then(() => {
    console.log('Database table created (or updated) successfully.');
  })
  .catch((error) => {
    console.error('Unable to create database tables:', error);
  });
module.exports = Admins;