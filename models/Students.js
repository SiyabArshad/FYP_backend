const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root:adminadmin@localhost:3306/digischool");
const Users=require("./Users")
const Students=sequelize.define("students",{
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
//Users.hasOne(Students, { foreignKey: 'userId' }); 
Students.belongsTo(Users, { foreignKey: 'userId' }); 

sequelize.sync()
module.exports = Students;