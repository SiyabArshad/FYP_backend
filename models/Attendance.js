const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root:adminadmin@localhost:3306/digischool");
const Enrollments=require("./Enrollments")
const Attendances=sequelize.define("attendances",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('present', 'absent'),
        allowNull: false
      }
})
Attendances.belongsTo(Enrollments, { foreignKey: 'enrollmentId',foreignKeyConstraint:true });
sequelize.sync()
.then(() => {
  console.log('Database table created (or updated) successfully.');
})
.catch((error) => {
  console.error('Unable to create database tables:', error);
});
module.exports = Attendances;