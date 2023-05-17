const Users=require("../models/Users")
const Admins=require("../models/Admins")
const Teachers=require("../models/Teachers")
const Students =require("../models/Students")
const { encryptText, compareText } = require("../helpers/encrptions");
const { generateToken } = require("../helpers/jwttokens");
const ResponseManager = require("../helpers/Message");
const { mailusers } = require("../helpers/senEmail");
//create user route Student only admin can do this
const CreateStudent=async(req,res)=>{
    if(req?.user?.data?.admin||req?.user?.data?.role==="teacher")
    {
     const { email, password,profile,name, phone, address } = req.body;
     try {
       const alreadyexist=await Users.findOne({where:{email:email}})
       if (alreadyexist) {
           return res.status(400).json(ResponseManager.errorResponse("User Already Exist.",400))
           
       } else {
           const newPass=await encryptText(password)
           const user = await Users.create({ email, password:newPass,role:"teacher",profile});
           const tteachers = await Students.create({ name, phone, address, userId: user.id });
           await mailusers(email,"Account Password",`Here is your Temporary Passowrd Login with this Password ${password} and Email ${email} and Update Your Password.`)
           return res.status(200).json(ResponseManager.successResponse({},"Student Has Been Created SucessFully")) 
       }
     } catch (error) {
           return res.status(500).json(ResponseManager.errorResponse());
     }
    }
    else
    {
     return res.status(500).json(ResponseManager.errorResponse("only Admin and Teachers can Perform This Action",500));
    }
 }
//update Student profile
const updateStudentprofile = async (req, res) => {
    if(req?.user?.data?.role==="student")
     {
    try {
      const userId = req.body.id;
      const { name, address, phone } = req.body;
  
      // Update the user profile
      const user = await Users.findByPk(userId);
      if (!user) {
        return res
          .status(400)
          .json(ResponseManager.errorResponse("User not found", 400));
      }
  
      // Update the Student profile
      const tea = await Students.findOne({ where: { userId } });
      if (!tea) {
        return res
          .status(400)
          .json(ResponseManager.errorResponse("Student not found", 400));
      }
  
      tea.name = name;
      tea.address = address;
      tea.phone = phone;
      await tea.save();
  
      return res.status(200).json(ResponseManager.successResponse({}, "Student profile updated successfully"));
    } catch (error) {
      console.log(error);
      return res.status(500).json(ResponseManager.errorResponse());
    }
  }
  else
     {
      return res.status(500).json(ResponseManager.errorResponse("only Student can Perform This Action",500));
     }
  };
//delete a Student admin accesss
const deleteStudent = async (req, res) => {
    if (req?.user?.data?.admin) {
      try {
        
        const userId = req.body.id||req.query.id;
        // Update the user profile
        const user = await Users.findByPk(userId);
        if (!user) {
          return res
            .status(400)
            .json(ResponseManager.errorResponse("User not found", 400));
        }
        
        // Update the Student profile
        const tea = await Students.findOne({ where: { userId } });
        if (!tea) {
          return res
            .status(400)
            .json(ResponseManager.errorResponse("Student not found", 400));
        }
    
        await user.destroy()
        await tea.destroy()
        return res.status(200).json(ResponseManager.successResponse({}, "Student deleted successfully"));
      } catch (error) {
        console.log(error);
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res.status(500).json(ResponseManager.errorResponse("Only Admin can perform this action", 500));
    }
  };
  //Student profile
const StudentProfile = async (req, res) => {
    if(req?.user?.data?.role==="student")
     {
    const userId = req.user.data.id;
    const userEmail = req.user.data.email;
    try {
      const user = await Users.findByPk(userId);
      if (!user) {
        return res.status(404).json(ResponseManager.errorResponse("User not found.", 404));
      }
      const admin = await Students.findOne({ where: { userId: userId } });
      if (!admin) {
        return res.status(404).json(ResponseManager.errorResponse("Student not found.", 404));
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
      return res.status(500).json(ResponseManager.errorResponse("only Student can Perform This Action",500));
     }
  };
  //getting Students pagination 
  const getStudents = async (req, res) => {
    if (!req?.user?.data?.admin && req?.user?.data?.role !== "teacher") {
      return res.status(401).json(ResponseManager.errorResponse("Unauthorized access."));
    }
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const offset = (page - 1) * limit;
  
    try {
      const students = await Students.findAndCountAll({
        offset,
        limit,
        include: {
          model: Users,
          attributes: ["email", "profile"],
        },
        attributes: ["name", "phone", "address"],
      });
  
      return res.status(200).json(ResponseManager.successResponse({
        students: students.rows.map((student) => ({
          name: student.name,
          email: student.User?.email,
          profilePic: student.User?.profile,
          phone: student.phone,
          address: student.address,
        })),
        total: students.count,
        limit,
        page,
        pages: Math.ceil(students.count / limit),
      }));
    } catch (error) {
      console.error(error);
      return res.status(500).json(ResponseManager.errorResponse());
    }
  };

 module.exports={CreateStudent,getStudents,updateStudentprofile,deleteStudent,StudentProfile}