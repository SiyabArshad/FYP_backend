const routesname={
    //routes of our application
    //students routes
    getallstudents:"/digischool/students",
    getspecificstudent:"/digischool/student",
    createstudent:"/digischool/createstudent",
    deletestudent:"/digischool/deletestudent",
    updatestudent:"/digischool/updatestudent",
    //teachers route
    getallteachers:"/digischool/teachers",
    getspecificteacher:"/digischool/teacherprofile",//craeted api teacher and admin can get profile
    createteacher:"/digischool/createteacher",//created api only admin can create the teachers
    deleteteacher:"/digischool/deleteteacher",//craeted api only admin can delete teachers
    updateteacher:"/digischool/updateteacher",//created api only admin and Teacher can Update
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
    //Authentication Routes
    loginroute:"/digischool/login",//api created and * access
    signuproute:"/digischool/createuser",//api created and only admin can create it
    getprofile:"/digischool/adminprofile",//api created and * access
    updateprofile:"/digischool/updateadminprofile",//api created and admin access
    resetUser:"/digischool/reset"//api created every one can update its account
}


module.exports=routesname