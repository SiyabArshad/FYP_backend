const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize( "digischool", "admin", "adminadmin", {
  host:  "digischool.cwgh8sist0pd.eu-north-1.rds.amazonaws.com",
  dialect: 'mysql',
});
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
module.exports = Results;