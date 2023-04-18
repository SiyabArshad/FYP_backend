const School=require("../models/school")
const ResponseManager = require("../helpers/Message");
const { encryptText, compareText } = require("../helpers/encrptions");

const createSchool=async(req,res)=>{
    if(req.user.data.usertype==='admin')
 {
    try {
      const school = await School.create(req.body);
       return res.status(201).json(ResponseManager.successResponse("School Created",201)); // Return the newly created school as JSON with a 201 status code
      } catch (err) {
        console.log(err)
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
 //get all schools data
 const getallschools=async(req,res)=>{
  if(req.user.data.usertype==='admin')
  {   
  try{
    const schools = await School.findAll({
      attributes: { exclude: ['code'] } // Exclude the 'code' field from the result
    });
    res.status(200).json(ResponseManager.successResponse(schools,"Schools data fetched sucessfully",200))
  }
  catch{
      return res.status(500).json(ResponseManager.errorResponse());
  }
}
else
{
return res.status(403).json(ResponseManager.errorResponse("Only Admin have this Authority",403));
}
}  

//get a school details with respect to code attribute every school member with code can access school info
const getschool=async(req,res)=>{
try {
  const { code,email } = req.body;
  const school = await School.findOne({ where: { email } });
  const validcode=await compareText(code,school.code)
  if (validcode&&school) {
    return res.status(200).json(ResponseManager.successResponse(school,"School Data",200));
  } else {
    return res.status(400).json(ResponseManager.errorResponse("No Record Found",400));
  }
} catch (err) {
  return res.status(500).json(ResponseManager.errorResponse());
}

}

module.exports={createSchool,updateSchool,getallschools,getschool}