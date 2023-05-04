const routesname={
    //routes of our application
    //students Routes Tested Routes All Cleared
    getallstudents:"/digischool/students",//created api admin can acess it
    getspecificstudent:"/digischool/student",//created api student can acess it
    createstudent:"/digischool/createstudent",//created api admin and Teacher can acess it
    deletestudent:"/digischool/deletestudent",//created api admin can acess it
    updatestudent:"/digischool/updatestudent",//created api student can acess it
    //teachers Routes Tested Routes All Cleared
    getallteachers:"/digischool/teachers",//created api admin can acess it
    getspecificteacher:"/digischool/teacherprofile",//created api teacher can get profile
    createteacher:"/digischool/createteacher",//created api only admin can create the teachers
    deleteteacher:"/digischool/deleteteacher",//craeted api only admin can delete teachers
    updateteacher:"/digischool/updateteacher",//created api only Teacher can Update
    //classes routes
    getallclasses:"/digischool/classes",
    getspecificclass:"/digischool/class",
    createclass:"/digischool/createclass",
    deleteclass:"/digischool/deleteclass",
    updateclass:"/digischool/updateclass",
    //enrollment(admisisons) routes
    getenrollmentofaclass:"/digischool/enrollment",
    getspecificenrollment:"/digischool/enrollment/student",
    createenrollment:"/digischool/createenrollment",
    deleteenrollment:"/digischool/deleteenrollment",
    updateenrollment:"/digischool/updateenrollment",
    //Results routes
    getresultofaclass:"/digischool/getresult",
    getspecificstudentresult:"/digischool/result/student",
    createresult:"/digischool/createresult",
    deleteresult:"/digischool/deleteresult",
    updateresult:"/digischool/updateresult",
    //Attendance Routes
    getattendanceofdate:"/digischool/getattendance",
    getspecificstudentattendanceofadate:"/digischool/attendance/student",
    createattendance:"/digischool/createattendance",
    deleteattendance:"/digischool/deleteattendance",
    updateattendance:"/digischool/updateattendance",
    //Accounts Routes
    gettransactionsdetail:"/digischool/gettransactions",
    getspecifictransactionsdetailofadate:"/digischool/transactions",
    createtransaction:"/digischool/createtransaction",
    deletetransaction:"/digischool/deletetransaction",
    updatetransaction:"/digischool/updatetransaction",
    //Authentication+Admin Routes Tested Routes All Cleared
    loginroute:"/digischool/login",//api created and * access
    signuproute:"/digischool/createuser",//api created and only admin can create it
    getprofile:"/digischool/adminprofile",//api created and * access
    updateprofile:"/digischool/updateadminprofile",//api created and admin access
    resetUser:"/digischool/reset"//api created every one can update its account
}


module.exports=routesname