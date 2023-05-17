const ResponseManager = require("../helpers/Message");
const { mailusers } = require("../helpers/senEmail");
const Enrollments = require("../models/Enrollments")
const Users=require("../models/Users")
const Admins=require("../models/Admins")
const Teachers=require("../models/Teachers")
const Classes=require("../models/Classes")
const Students=require("../models/Students")
const CreateEnrollment=async(req,res)=>{
    if(req?.user?.data?.role==='teacher')
    {
     const { classId,studentId } = req.body;
     try {
       const alreadyexist=await Enrollments.findOne({where:{studentId,classId}})
       if (alreadyexist) {
           return res.status(400).json(ResponseManager.errorResponse("Student Already Enrolled in this class.",400))
       } else {
           await Enrollments.create({classId,studentId,status:true});
           return res.status(200).json(ResponseManager.successResponse({},"Student Has Been Enrolled SucessFully")) 
       }
     } catch (error) {
           return res.status(500).json(ResponseManager.errorResponse());
     }
    }
    else
    {
     return res.status(500).json(ResponseManager.errorResponse("only Teacher can Perform This Action",500));
    }
 }
 //update enrollment
 const UpdateEnrollmentStatus = async (req, res) => {
    if(req?.user?.data?.role==='teacher')
    {
    const { enrollmentId, status } = req.body;
    
    try {
      const enrollment = await Enrollments.findByPk(enrollmentId);
      if (!enrollment) {
        return res.status(404).json(ResponseManager.errorResponse("Enrollment not found.", 404));
      }
      enrollment.status = status;
      await enrollment.save();
      return res.status(200).json(ResponseManager.successResponse({}, "Enrollment status updated successfully."));
    } catch (error) {
      console.error(error);
      return res.status(500).json(ResponseManager.errorResponse());
    }
}
else
{
    return res.status(500).json(ResponseManager.errorResponse("only Teacher can Perform This Action",500));
}
};

//delete enrollment

const DeleteEnrollment = async(req, res) => {
    if (req?.user?.data?.role === 'teacher') {
        const enrollmentId = req.params.id||req.query.id||req.body.id; // Assuming you are passing Enrollment in URL params
  
      try {
        const targetClass = await Enrollments.findOne({ where: { id: enrollmentId} });
        if (!targetClass) {
          return res.status(400).json(ResponseManager.errorResponse("Enrollment not found", 400));
        }
        await targetClass.destroy();
        return res.status(200).json(ResponseManager.successResponse({}, "Enrollment Has Been Deleted Successfully"));
  
      } catch (error) {
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res.status(500).json(ResponseManager.errorResponse("Only Teacher can perform this action", 500));
    }
  }
//get all enrollment of particular class but whose status true
const GetAllEnrollments = async (req, res) => {
    if (req?.user?.data?.role === 'teacher') {
      const classId = req.query.classId || req.body.classId;
  
      try {
        const enrollments = await Enrollments.findAll({
          where: { classId, status: true },
          include: [
            {
              model: Classes,
              attributes: ['id', 'classname', 'section'],
            },
            {
              model: Students,
              attributes: ['id', 'name', 'phone', 'address']
            }
          ]
        });
  
        return res.status(200).json(ResponseManager.successResponse(enrollments));
      } catch (error) {
        console.error(error);
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res.status(500).json(ResponseManager.errorResponse("Only Teacher can perform this action", 500));
    }
  };
  
//get all enrollment of particular student but whose status true
const GetEnrollmentsByStudentId = async (req, res) => {
    if (req?.user?.data?.role === "student") {
      const {id}=req.query||req.body||req.params
      try {
        const enrollments = await Enrollments.findAll({
          where: { studentId: id, status: true },
          include: {
            model: Classes,
            attributes: ['section', 'classname'] // You can select the specific attributes you want to include from the Class model.
          }
        });
        return res
          .status(200)
          .json(ResponseManager.successResponse(enrollments, "Enrollments fetched successfully."));
      } catch (error) {
        console.error(error);
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res.status(500).json(ResponseManager.errorResponse("Only students can perform this action.", 500));
    }
  };
  
//exports
 module.exports={CreateEnrollment,UpdateEnrollmentStatus,DeleteEnrollment,GetEnrollmentsByStudentId,GetAllEnrollments}