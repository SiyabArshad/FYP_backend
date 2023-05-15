const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize( "digischool", "admin", "adminadmin", {
  host:  "digischool.cwgh8sist0pd.eu-north-1.rds.amazonaws.com",
  dialect: 'mysql',
});
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
module.exports = Attendances;