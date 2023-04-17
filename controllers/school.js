const School=require("../models/school")
const ResponseManager = require("../helpers/Message");

const createSchool=async(req,res)=>{
    if(req.user.data.usertype==='admin')
 {
    try {
        // Create a new school object with the data from the request body
        const school = await School.create(req.body);
       return res.status(201).json(ResponseManager.successResponse("School Created",201)); // Return the newly created school as JSON with a 201 status code
      } catch (err) {
        return res.status(500).json(ResponseManager.errorResponse()); // Return an error message with a 500 status code if something went wrong
      }
 }
 {
    return res.status(403).json(ResponseManager.errorResponse("Only Admin have this Authority",403));
  }
}
const updateSchool=async(req,res)=>{
    if(req.user.data.usertype==='admin')
    {   
    try {
        const schoolId = req.body.id||req.params.id;
        // Check if the school exists
        const school = await School.findByPk(schoolId);
        if (!school) {
           return res.status(404).json(ResponseManager.successResponse("School not Found",404));
        }
    
        // Toggle the disable attribute
        const updatedSchool = await school.update({
          disable: !school.disable
        });
    
        return res.status(201).json(ResponseManager.successResponse("Sucessfully done",201));
      } catch (error) {
        console.log(error)
       return res.status(500).json(ResponseManager.successResponse());
      }
    }
    {
       return res.status(403).json(ResponseManager.errorResponse("Only Admin have this Authority",403));
     }
}


module.exports={createSchool,updateSchool}