const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root:adminadmin@localhost:3306/digischool");
const Students=require("./Students")
const Classes=require("./Classes")
const Enrollments=sequelize.define("enrollments",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
})
// Define the many-to-one relationship between Enrollment and Class
Enrollments.belongsTo(Classes, { foreignKey: 'classId' ,foreignKeyConstraint: true }); // Each enrollment belongs to one class

// Define the many-to-one relationship between Enrollment and Student
Enrollments.belongsTo(Students, { foreignKey: 'studentId',foreignKeyConstraint: true  }); // Each enrollment belongs to one student

sequelize.sync()
.then(() => {
  console.log('Database table created (or updated) successfully.');
})
.catch((error) => {
  console.error('Unable to create database tables:', error);
});
module.exports = Enrollments;