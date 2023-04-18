const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("mysql://root:adminadmin@localhost:3306/digischool");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { encryptText, compareText } = require("../helpers/encrptions");

const School = sequelize.define('School', {
    schoolId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    schoolName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schoolDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNo: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    schoolAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      defaultValue:"9845",
      allowNull: true
    },
    disable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    }
  }, {
    hooks: {
      afterCreate: async (school) => {
        // Generate an auto-generated code and encrypt it using bcrypt
        const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit code
        const hashedCode =await encryptText(code)// Hash the code using bcrypt with a salt factor of 10
        school.code = hashedCode;
        
        // Send the decrypted code to the school's email
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
          subject: 'Thanks to Be a Member of Digi School',
          text: `Your school code is: ${code}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("email not sent")
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
        await school.save();
      }
    }
  });

sequelize.sync();

module.exports = School;
