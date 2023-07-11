const Users=require("../models/Users")
const Admins=require("../models/Admins")
const Teachers=require("../models/Teachers")
const Classes=require("../models/Classes")
const { encryptText, compareText } = require("../helpers/encrptions");
const { generateToken } = require("../helpers/jwttokens");
const ResponseManager = require("../helpers/Message");
const { mailusers } = require("../helpers/senEmail");

const CreateClass=async(req,res)=>{
    if(req?.user?.data?.role==='teacher')
    {
     const { classname,section } = req.body;
     try {
      const teacher=await Teachers.findOne({where:{userId:req?.user?.data?.id}}) 
           await Classes.create({classname,section,teacherId:teacher?.id});
           return res.status(200).json(ResponseManager.successResponse({},"Class Has Been Created SucessFully")) 
     } catch (error) {
      console.log(error)
           return res.status(500).json(ResponseManager.errorResponse());
     }
    }
    else
    {
     return res.status(500).json(ResponseManager.errorResponse("only Teacher can Perform This Action",500));
    }
 }
//update a class
const UpdateClass = async(req, res) => {
    if (req?.user?.data?.role === 'teacher') {
      const classId = req.params.id||req.query.id||req.body.id; // Assuming you are passing class id in URL params
  
      try {
        const targetClass = await Classes.findOne({ where: { id: classId } });
        if (!targetClass) {
          return res.status(400).json(ResponseManager.errorResponse("Class not found", 400));
        }
        if (targetClass.teacherId !== req.user.data.id) {
          return res.status(400).json(ResponseManager.errorResponse("Only owner of the class can perform this action", 400));
        }
  
        await Classes.update(req.body, { where: { id: classId } });
  
        return res.status(200).json(ResponseManager.successResponse({}, "Class Has Been Updated Successfully"));
  
      } catch (error) {
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res.status(500).json(ResponseManager.errorResponse("Only Teacher can perform this action", 500));
    }
  }
//delete class
const DeleteClass = async(req, res) => {
    if (req?.user?.data?.role === 'teacher') {
        const classId = req.params.id||req.query.id||req.body.id; // Assuming you are passing class id in URL params
  
      try {
        const targetClass = await Classes.findOne({ where: { id: classId } });
        if (!targetClass) {
          return res.status(400).json(ResponseManager.errorResponse("Class not found", 400));
        }
        if (targetClass.teacherId !== req.user.data.id) {
          return res.status(400).json(ResponseManager.errorResponse("Only owner of the class can perform this action", 400));
        }
  
        await Classes.destroy({ where: { id: classId } });
  
        return res.status(200).json(ResponseManager.successResponse({}, "Class Has Been Deleted Successfully"));
  
      } catch (error) {
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res.status(500).json(ResponseManager.errorResponse("Only Teacher can perform this action", 500));
    }
  }
  //get class detail
  const GetClassDetail = async(req, res) => {
    const classId = req.params.id||req.query.id||req.body.id; // Assuming you are passing class id in URL params
    try {
      const targetClass = await Classes.findOne({
        where: { id: classId }, 
      });
      if (!targetClass) {
        return res.status(400).json(ResponseManager.errorResponse("Class not found", 400));
      }
  
      if (targetClass.teacherId !== req.user.data.id) {
        return res.status(400).json(ResponseManager.errorResponse("Only the owner of the class can view its details", 400));
      }
  
      return res.status(200).json(ResponseManager.successResponse(targetClass, "Class Detail"));
  
    } catch (error) {
      return res.status(500).json(ResponseManager.errorResponse());
    }


  }  
  //get all classes associated with the teacher
  const GetallClass = async(req, res) => {
    const teacherId = req.user.data.id;
    try {
      const teacherClasses = await Classes.findAll({
        where: { teacherId }
      });
      return res.status(200).json(ResponseManager.successResponse(teacherClasses, "Teacher's Classes"));
  
    } catch (error) {
      return res.status(500).json(ResponseManager.errorResponse());
    }
  }  
 module.exports={CreateClass,UpdateClass,DeleteClass,GetClassDetail,GetallClass}