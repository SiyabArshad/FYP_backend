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
      obtainedmarks: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalmarks: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grade: {
        type: DataTypes.STRING
      }
})

Results.belongsTo(Enrollments, { foreignKey: 'enrollmentId',foreignKeyConstraint: true  });

sequelize.sync()
.then(() => {
  console.log('Database table created (or updated) successfully.');
})
.catch((error) => {
  console.error('Unable to create database tables:', error);
});
module.exports = Results;