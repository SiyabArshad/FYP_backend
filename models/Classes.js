const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root:adminadmin@localhost:3306/digischool");
const Teachers=require("./Teachers")
const Classes=sequelize.define("classes",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    classname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    section:{
        type:DataTypes.STRING,
        defaultValue:"Alpha"
    },
})
Classes.belongsTo(Teachers, { foreignKey: 'teacherId',foreignKeyConstraint: true });
sequelize.sync()
.then(() => {
    console.log('Database table created (or updated) successfully.');
  })
  .catch((error) => {
    console.error('Unable to create database tables:', error);
  });
module.exports = Classes;