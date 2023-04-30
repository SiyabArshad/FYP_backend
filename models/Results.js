const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root:adminadmin@localhost:3306/digischool");
const Enrollments=require("./Enrollments")
const Results=sequelize.define("results",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      subject: {
        type: DataTypes.STRING,
      },
      marks: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false
      }
})

Enrollments.hasMany(Results, { foreignKey: 'enrollmentId' }); 
Results.belongsTo(Enrollments, { foreignKey: 'enrollmentId' });

sequelize.sync()
module.exports = Results;