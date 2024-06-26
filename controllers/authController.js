 const Users=require("../models/Users")
 const Admins=require("../models/Admins")
const { encryptText, compareText } = require("../helpers/encrptions");
const { generateToken } = require("../helpers/jwttokens");
const ResponseManager = require("../helpers/Message");
const {mailusers}=require("../helpers/senEmail")
const base64url = require('base64url');

//create user route admin
const CreateUser=async(req,res)=>{
   if(req?.user?.data?.admin)
   {
    const { email, password,role, profile,admin,name, phone, address } = req.body;
    try {
      const alreadyexist=await Users.findOne({where:{email:email}})
      if (alreadyexist) {
          return res.status(400).json(ResponseManager.errorResponse("User Already Exist.",400))
          
      } else {
          const newPass=await encryptText(password)
          const user = await Users.create({ email, password:newPass,admin,role,profile});
          const admint = await Admins.create({ name, phone, address, userId: user.id });
          await mailusers(email,`Hi ${name} Welcome to Digi School Family Here is your Password ${password} Kindly change it as soon as possible Account Type ${role}. `,`<h1>Welcome</h1>`)

          return res.status(200).json(ResponseManager.successResponse({},"User Created SucessFully"))
        
      }
    } catch (error) {
          return res.status(500).json(ResponseManager.errorResponse());
    }
   }
   else
   {
    return res.status(500).json(ResponseManager.errorResponse("only Admin can Perform This Action",500));
   }
}
//login controllers
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(404)
        .json(ResponseManager.errorResponse("User not found", 404));
    } else {
      const isMatched = await compareText(password, user.password);
      if (isMatched) {
        const token = generateToken({ id: user.id, email: user.email,admin:user.admin,role:user.role });
        return res.status(200).json(ResponseManager.successResponse({ token,role:user.role,admin:user.admin },"Logged in Sucessfully",200));
      } else {
        return res
          .status(403)
          .json(ResponseManager.errorResponse("Password not matched", 403));
      }
    }
  } catch (error) {
    return res.status(500).json(ResponseManager.errorResponse());
  }
};
//password link controllers
const PasswordLinkSend = async (req, res) => {
  const { email} = req.body;
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(404)
        .json(ResponseManager.errorResponse("User not found", 404));
    } else {
        const token = base64url(generateToken({ id: user.id, email: user.email,admin:user.admin,role:user.role },"5m"));
        await mailusers(email,"Account Password Recovery",`Here is your Passowrd Reset Link.`,`<a href=${process.env.PASSURL}${token}>Reset Password</a>`)
        return res.status(200).json(ResponseManager.successResponse({},"Password Recovery Mail sent")) 
      }
  } catch (error) {
    return res.status(500).json(ResponseManager.errorResponse());
  }
};
//admin profile
const AdminProfile = async (req, res) => {
  if(req?.user?.data?.admin)
   {
  const userId = req.user.data.id;
  const userEmail = req.user.data.email;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json(ResponseManager.errorResponse("User not found.", 404));
    }
    const admin = await Admins.findOne({ where: { userId: user?.id } });
    if (!admin) {
      return res.status(404).json(ResponseManager.errorResponse("Admin not found.", 404));
    }
    const userProfile = {
      email: userEmail,
      name: admin.name,
      phone: admin.phone,
      address: admin.address,
      profile:user.profile,
      id:admin.id
    };
    return res.status(200).json(ResponseManager.successResponse(userProfile));
  } catch (error) {
    console.error(error);
    return res.status(500).json(ResponseManager.errorResponse());
  }
}
else
   {
    return res.status(500).json(ResponseManager.errorResponse("only Admin can Perform This Action",500));
   }
};
//update admin profile
const updateadminprofile = async (req, res) => {
  if(req?.user?.data?.admin)
   {
  try {
    const userId = req.user.data.id;
    const { name, address, phone,profile } = req.body;
    // Update the user profile
    const user = await Users.findByPk(userId);
    if (!user) {
      return res
        .status(400)
        .json(ResponseManager.errorResponse("User not found", 400));
    }

    // Update the admin profile
    const admin = await Admins.findOne({ where: { userId:user?.id } });
    if (!admin) {
      return res
        .status(400)
        .json(ResponseManager.errorResponse("Admin not found", 400));
    }
    if(profile)
    {
      user.profile=profile
    }
    admin.name = name;
    admin.address = address;
    admin.phone = phone;
    await admin.save();
    await user.save();

    return res.status(200).json(ResponseManager.successResponse({}, "Admin profile updated successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(ResponseManager.errorResponse());
  }
}
else
   {
    return res.status(500).json(ResponseManager.errorResponse("only Admin can Perform This Action",500));
   }
};
//reset User controller
const resetUser = async (req, res) => {
  try {
    const { email, password, profile,devicetoken } = req.body;
    const userId = req.user.data.id;
    const user = await Users.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json(ResponseManager.errorResponse("User not found", 404));
    }

    // Update the user's email and profile
    if (email) {
      user.email = email;
    }
    if(profile)
    {
      user.profile = profile;
    }

    // Update the user's password if a new password is provided
    if (password) {
      const newPass = await encryptText(password);
      user.password = newPass;
    }
    if(devicetoken)
    {
      user.devicetoken=devicetoken
    }
    // Save the changes to the database
    await user.save();

    return res
      .status(200)
      .json(ResponseManager.successResponse({}, "User reset successful"));
  } catch (error) {
    // console.error(error);
    return res.status(500).json(ResponseManager.errorResponse());
  }
};

//update password
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.data.id;
    const user = await Users.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json(ResponseManager.errorResponse("User not found", 404));
    }

   
    // Update the user's password if a new password is provided
    if (password) {
      const newPass = await encryptText(password);
      user.password = newPass;
    }
    await user.save();

    return res
      .status(200)
      .json(ResponseManager.successResponse({}, "Password reset successful"));
  } catch (error) {
    // console.error(error);
    return res.status(500).json(ResponseManager.errorResponse());
  }
};
//exports
module.exports={CreateUser,loginUser,AdminProfile,updateadminprofile,resetUser,PasswordLinkSend,resetPassword}