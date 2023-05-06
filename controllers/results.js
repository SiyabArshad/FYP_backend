const ResponseManager = require("../helpers/Message");
const { mailusers } = require("../helpers/senEmail");
const Enrollments = require("../models/Enrollments")
const Users=require("../models/Users")
const Admins=require("../models/Admins")
const Teachers=require("../models/Teachers")
const Classes=require("../models/Classes")
const Students=require("../models/Students")
const Results=require("../models/Results")

const CreateResults=async(req,res)=>{
    if(req?.user?.data?.role==='teacher')
    {
     const {enrollmentId} = req.body;
     try {
           await Results.create(req.body);
           return res.status(200).json(ResponseManager.successResponse({},"Result Has Been Generated SucessFully")) 
  
     } catch (error) {
           return res.status(500).json(ResponseManager.errorResponse());
     }
    }
    else
    {
     return res.status(500).json(ResponseManager.errorResponse("only Teacher can Perform This Action",500));
    }
 }
//delete Result Controller

const deleteResult = async (req, res) => {
    if (req?.user?.data?.role === "teacher") {
      try {
        const { id } = req.body||req.query||req.params;
        const result = await Results.findByPk(id);
  
        if (!result) {
          return res
            .status(404)
            .json(ResponseManager.errorResponse("Result not found", 404));
        }
  
        await result.destroy();
  
        return res
          .status(200)
          .json(ResponseManager.successResponse({}, "Result deleted successfully"));
      } catch (error) {
        console.log(error)
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res
        .status(500)
        .json(
          ResponseManager.errorResponse(
            "Only teacher can perform this action",
            500
          )
        );
    }
  };
  //update Results
  const UpdateResults = async (req, res) => {
    if (req?.user?.data?.role === "teacher") {
      const { id } = req.body;
      try {
        const result = await Results.findByPk(id);
        
        if (!result) {
          return res
            .status(404)
            .json(
              ResponseManager.errorResponse("Result not found.", 404)
            );
        }
  
        // Update the properties of the result instance
        result.totalmarks = req.body.totalmarks||result.totalmarks;
        result.obtainedmarks = req.body.obtainedmarks||result.obtainedmarks;
        result.grade = req.body.grade||result.grade;
        result.subject = req.body.subject||result.subject;
        // ...
  
        // Save the changes to the database
        await result.save();
  
        return res
          .status(200)
          .json(
            ResponseManager.successResponse(
              {},
              "Result updated successfully."
            )
          );
      } catch (error) {
        console.error(error);
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res
        .status(500)
        .json(
          ResponseManager.errorResponse(
            "Only teacher can perform this action",
            500
          )
        );
    }
  };
  //get all results of a student 
  const GetResultsByEnrolmentId = async (req, res) => {
    if (req?.user?.data?.role === "teacher"||req?.user?.data?.role === "student") {
    const { enrollmentId } = req.body;
    try {
      const results = await Results.findAll({
        where: {
         enrollmentId,
        },
      });
  
      return res
        .status(200)
        .json(
          ResponseManager.successResponse(
            { results },
            "Results retrieved successfully."
          )
        );
    } catch (error) {
      console.error(error);
      return res.status(500).json(ResponseManager.errorResponse());
    }
}
else
{
    return res
    .status(500)
    .json(
      ResponseManager.errorResponse(
        "Only teacher can perform this action",
        500
      )
    );
}
  };
  

 module.exports={CreateResults,deleteResult,UpdateResults,GetResultsByEnrolmentId}