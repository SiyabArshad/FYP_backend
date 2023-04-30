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
Enrollments.hasMany(Attendances, { foreignKey: 'enrollmentId' }); 
Attendances.belongsTo(Enrollments, { foreignKey: 'enrollmentId' });
sequelize.sync()
module.exports = Attendances;