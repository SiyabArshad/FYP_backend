const ResponseManager = require("../helpers/Message");
const { mailusers } = require("../helpers/senEmail");
const Enrollments = require("../models/Enrollments")
const Users=require("../models/Users")
const Admins=require("../models/Admins")
const Teachers=require("../models/Teachers")
const Classes=require("../models/Classes")
const Students=require("../models/Students")
const Results=require("../models/Results")
const Attendance=require("../models/Attendance")
const { Op } = require('sequelize');
//create attendance
const createAttendance = async (req, res) => {
    if (req?.user?.data?.role === 'teacher') {
      const { enrollmentId, date, status } = req.body;
      try {
        // Check if the enrollment exists
        const enrollment = await Enrollments.findOne({ where: { id: enrollmentId } });
        if (!enrollment) {
          return res.status(404).json(ResponseManager.errorResponse("Enrollment does not exist",404));
        }
        // Check if an attendance already exists for this enrollment on this date
        const attendance = await Attendance.findOne({ where: { enrollmentId, date } });
        if (attendance) {
          return res.status(400).json(ResponseManager.errorResponse("Attendance already exists for this enrollment on this date If you want to add new delete it",400));
        }
  
        // Create the attendance
        await Attendance.create({ enrollmentId, date, status });
        return res.status(200).json(ResponseManager.successResponse({},'Attendance created successfully' ));
      } catch (error) {
        return  res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return  res.status(401).json(ResponseManager.errorResponse("only Teacher can Perform This Action",401));
    }
  };
// Update attendance
const updateAttendance = async (req, res) => {
    if (req?.user?.data?.role === 'teacher') {
    const attendanceId = req.body.id||req.query.id; // The ID of the attendance to update
    const status = req.body.status; // The new status value to set
    
    try {
      // Check if the attendance exists
      const attendance = await Attendance.findOne({ where: { id: attendanceId } });
      if (!attendance) {
        return res.status(404).json(ResponseManager.errorResponse("Attendance does not exist",404));
      }
  
      // Update the attendance status
      await Attendance.update({ status }, { where: { id: attendanceId } });
  
      return res.status(200).json(ResponseManager.successResponse({}, "Attendance updated successfully"));
    } catch (error) {
      return res.status(500).json(ResponseManager.errorResponse());
    }
}
else {
    return res.status(401).json(ResponseManager.errorResponse("Only teacher can perform this action", 401));
}
  };
  
//delete attendance
const deleteAttendance = async (req, res) => {
    if (req?.user?.data?.role === 'teacher') {
        const attendanceId = req.body.id||req.params.id||req.query.id;
        try {
            // Check if the attendance exists
            const attendance = await Attendance.findOne({ where: { id: attendanceId } });
            if (!attendance) {
                return res.status(404).json(ResponseManager.errorResponse("Attendance does not exist",404));
            }

            // Delete the attendance
            await attendance.destroy();
            return res.status(200).json(ResponseManager.successResponse({},'Attendance deleted successfully' ));
        } catch (error) {
            return res.status(500).json(ResponseManager.errorResponse());
        }
    } else {
        return res.status(401).json(ResponseManager.errorResponse("Only teacher can perform this action", 401));
    }
};
//get all attendance of enrollment id and percentage
const getAllAttendance = async (req, res) => {
    const { enrollmentId } = req.query||req.body
    console.log(enrollmentId)
    try {
      // Check if the enrollment exists
      const enrollment = await Enrollments.findOne({ where: { id: enrollmentId } });
      if (!enrollment) {
        return res.status(404).json(ResponseManager.errorResponse("Enrollment does not exist", 404));
      }
      // Get all attendance for the enrollment
      const attendance = await Attendance.findAll({ where: { enrollmentId } });
  
      let totalAttendance = 0;
      let totalPresent = 0;
      let totalAbsent = 0;
  
      attendance.forEach((record) => {
        if (record.status === "present") {
          totalPresent++;
        } else {
          totalAbsent++;
        }
        totalAttendance++;
      });
  
      const percentage = (totalPresent / totalAttendance) * 100;
  
      return res
        .status(200)
        .json(
          ResponseManager.successResponse(
            {
              attendance,
              totalAttendance,
              totalPresent,
              totalAbsent,
              percentage: isNaN(percentage) ? 0 : percentage.toFixed(2),
            },
            "Attendance retrieved successfully"
          )
        );
    } catch (error) {
      return res.status(500).json(ResponseManager.errorResponse());
    }
  };
  
//get specific attendance
const getAttendanceByDate = async (req, res) => {
    const { enrollmentId, date } = req.body||req.query;
    try {
      // Check if the enrollment exists
      const enrollment = await Enrollments.findOne({ where: { id: enrollmentId } });
      if (!enrollment) {
        return res.status(404).json(ResponseManager.errorResponse('Enrollment does not exist', 404));
      }
  
      // Get the attendance for the enrollment and date
      const attendance = await Attendance.findOne({
        where: {
          enrollmentId,
          date: {
            [Op.eq]: new Date(date),
          },
        },
      });
  
      if (!attendance) {
        return res.status(404).json(ResponseManager.errorResponse('Attendance does not exist for this enrollment and date', 404));
      }
  
      return res.status(200).json(ResponseManager.successResponse({ attendance }, 'Attendance retrieved successfully'));
    } catch (error) {
      return res.status(500).json(ResponseManager.errorResponse());
    }
  };
  

module.exports={createAttendance,updateAttendance,deleteAttendance,getAllAttendance,getAttendanceByDate}