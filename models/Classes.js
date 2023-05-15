const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize( "digischool", "admin", "adminadmin", {
    host:  "digischool.cwgh8sist0pd.eu-north-1.rds.amazonaws.com",
    dialect: 'mysql',
  });
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
module.exports = Classes;