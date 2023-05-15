const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize( "digischool", "admin", "adminadmin", {
    host:  "digischool.cwgh8sist0pd.eu-north-1.rds.amazonaws.com",
    dialect: 'mysql',
  });
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
Students.belongsTo(Users, { foreignKey: 'userId' ,foreignKeyConstraint: true }); 

sequelize.sync()
module.exports = Students;