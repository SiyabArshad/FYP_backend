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
//Users.hasOne(Admins, { foreignKey: 'userId', foreignKeyConstraint: true }); 
Admins.belongsTo(Users, { foreignKey: 'userId', foreignKeyConstraint: true }); 

sequelize.sync()
module.exports = Admins;