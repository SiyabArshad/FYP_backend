const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root:adminadmin@localhost:3306/digischool");
const nodemailer = require('nodemailer');
const Users=sequelize.define("users",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    admin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    role:{
        type:DataTypes.ENUM('teacher','admin','student'),
        defaultValue:"teacher"
    },
    profile:{
        type:DataTypes.STRING,
        defaultValue:""
    },
}, {
    hooks: {
      afterCreate: async (school) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
              user: "Shaheerkhan4525@gmail.com",
              pass: "wtbbypqhgmnezdkg",
            },
        });
        const mailOptions = {
          from: 'Shaheerkhan4525@gmail.com',
          to: school.email,
          subject: `An Account Has Been Created using ${school.email}`,
          text: `This Email Sync With our ERP`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("email not sent")
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
      }
    }
  }
)

sequelize.sync()
module.exports = Users;