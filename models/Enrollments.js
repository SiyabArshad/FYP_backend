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
Enrollments.belongsTo(Classes, { foreignKey: 'classId' }); // Each enrollment belongs to one class
Classes.hasMany(Enrollments, { foreignKey: 'classId' }); // Each class can have multiple enrollments

// Define the many-to-one relationship between Enrollment and Student
Enrollments.belongsTo(Students, { foreignKey: 'studentId' }); // Each enrollment belongs to one student
Students.hasMany(Enrollments, { foreignKey: 'studentId' }); // Each student can have multiple enrollments

sequelize.sync()
module.exports = Enrollments;