const Users=require("../models/Users")
const Students =require("../models/Students")
const { encryptText, compareText } = require("../helpers/encrptions");
const { generateToken } = require("../helpers/jwttokens");
const ResponseManager = require("../helpers/Message");
const { mailusers } = require("../helpers/senEmail");
const { Op } = require('sequelize');

//create user route Student only admin can do this
const CreateStudent=async(req,res)=>{
    if(req?.user?.data?.admin||req?.user?.data?.role==="teacher")
    {
     const { email, password,profile,name, phone, address,fathername,rollno } = req.body;
     try {
       const alreadyexist=await Users.findOne({where:{email:email}})
       if (alreadyexist) {
           return res.status(400).json(ResponseManager.errorResponse("User Already Exist.",400))
           
       } else {
           const newPass=await encryptText(password)
           const user = await Users.create({ email, password:newPass,role:"student",profile});
           const tteachers = await Students.create({ name, phone, address, userId: user.id,rollno,fathername });
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
      const userId = req.user.data.id;
      const { name,profile } = req.body||req.query;
  
      // Update the user profile
      const user = await Users.findByPk(userId);
      if (!user) {
        return res
          .status(400)
          .json(ResponseManager.errorResponse("User not found", 400));
      }
  
      // Update the Student profile
      const tea = await Students.findOne({ where: { userId:user?.id } });
      if (!tea) {
        return res
          .status(400)
          .json(ResponseManager.errorResponse("Student not found", 400));
      }
      tea.name = name;
      if(profile)
      {
        user.profile=profile
      }
      await user.save()
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
        const tea = await Students.findOne({ where: { userId:user?.id } });
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
      const admin = await Students.findOne({ where: {userId:user?.id } });
      if (!admin) {
        return res.status(404).json(ResponseManager.errorResponse("Student not found.", 404));
      }
      const userProfile = {
        email: userEmail,
        name: admin.name,
        phone: admin.phone,
        address: admin.address,
        profile:user.profile,
        id:admin.id,
        rollno:admin.rollno,
        fathername:admin.fathername
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

  const getStudents = async (req, res) => {
    if (!req?.user?.data?.admin && req?.user?.data?.role !== "teacher") {
      return res.status(401).json(ResponseManager.errorResponse("Unauthorized access."));
    }
  
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const searchText = req.query.searchText || '';
  
    const offset = (page - 1) * limit;
  
    try {
      let whereCondition = {};
  
      if (searchText !== '') {
        whereCondition.name = {
          [Op.like]: `%${searchText}%`
        };
      }
  
      const students = await Students.findAndCountAll({
        offset,
        limit,
        where: whereCondition,
        include: {
          model: Users,
          attributes: ["email", "profile", "id"],
        },
        attributes: ["name", "phone", "address", "rollno"],
      });
      
      return res.status(200).json(ResponseManager.successResponse({
        students: students.rows.map((student) => ({
          name: student.name,
          email: student.user?.dataValues.email,
          profilePic: student.user?.dataValues.profile,
          phone: student.phone,
          address: student.address,
          rollno: student.rollno,
          id: student?.user?.dataValues.id
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
  
  //count api
  const getstudentcount=async(req,res)=>{
    try{
           const studentsc=await Students.count()
           return res.status(200).json(ResponseManager.successResponse({count:studentsc}))   
    }
    catch{
      console.error(error);
      return res.status(500).json(ResponseManager.errorResponse());
    
    }
  }
 module.exports={CreateStudent,getStudents,updateStudentprofile,deleteStudent,StudentProfile,getstudentcount}