const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize( "digischool", "admin", "adminadmin", {
  host:  "digischool.cwgh8sist0pd.eu-north-1.rds.amazonaws.com",
  dialect: 'mysql',
});
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
module.exports = Enrollments;