const nodemailer = require('nodemailer');

 const mailusers=async(useremail,subject,body)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
              user: "Shaheerkhan4525@gmail.com",
              pass: "wtbbypqhgmnezdkg",
            },
        });
        const mailOptions = {
          from: 'Shaheerkhan4525@gmail.com',
          to: useremail,
          subject: subject,
          text: body
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("email not sent")
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });
    }
    catch(e){
        console.log(e)
    }
}

module.exports={mailusers}