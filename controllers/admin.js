const ResponseManager = require("../helpers/Message");
const Admin = require("../models/admin");
const { encryptText, compareText } = require("../helpers/encrptions");
const { generateToken } = require("../helpers/jwttokens");

const createadmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if an admin with the same email already exists
    const adminexist = await Admin.findOne({ where: { email: email } });

    if (adminexist) {
      return res.status(400).json(ResponseManager.errorResponse('Admin with this email already exists', 400));
    } else {
      // hash the password before saving it to the database
      const encryptedPassword = await encryptText(password);

      // create a new admin
      const newAdmin = await Admin.create({
        name: name,
        email: email,
        password: encryptedPassword,
      });

      // remove the password field from the newAdmin object
      const { password: omit, ...admin } = newAdmin.get();

      // generate a JWT token for the new admin
      const token = await generateToken(newAdmin.adminId);

      return res.status(200).json(ResponseManager.successResponse({
        admin: admin,
        token: token,
      },"Admin created successfully"))
    }
  } catch (error) {
    return res.status(500).json(ResponseManager.errorResponse());
  }
};
//login admin
const loginadmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // find the admin with the provided email
      const admin = await Admin.findOne({ where: { email: email } });
  
      if (!admin) {
        // if no admin found with provided email, return error response
        return res.status(401).json(ResponseManager.errorResponse('Invalid email or password', 401));
      }
  
      // check if the provided password matches the stored encrypted password
      const isMatch = await compareText(password, admin.password);
  
      if (!isMatch) {
        // if the provided password does not match, return error response
        return res.status(401).json(ResponseManager.errorResponse('Invalid email or password', 401));
      }
  
      // generate a JWT token for the authenticated admin
      const token = await generateToken(admin.adminId);
  
      return res.status(200).json(ResponseManager.successResponse({ token }, 'Logged in successfully'));
    } catch (error) {
      return res.status(500).json(ResponseManager.errorResponse());
    }
  };
  

module.exports = { createadmin,loginadmin };