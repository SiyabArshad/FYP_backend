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
Teachers.hasMany(Classes, { foreignKey: 'teacherId' }); 
Classes.belongsTo(Teachers, { foreignKey: 'teacherId' });
sequelize.sync()
module.exports = Classes;