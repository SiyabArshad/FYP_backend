const routesname={
    adminlogin:"/admin/loginadmin",
    createadmin:"/admin/createadmin",
    createschool:"/admin/createschool",
    disableschool:"/admin/disableschool",
    getallschool:"/admin/schools",
    getschool:"/school/getschool",
    //routes of our application
    //students routes
    getallstudents:"digischool/students",
    getspecificstudent:"digischool/student",
    createstudent:"digischool/createstudent",
    deletestudent:"digischool/deletestudent",
    updatestudent:"digischool/updatestudent",
    //teachers route
    getallteachers:"digischool/teachers",
    getspecificteacher:"digischool/teacher",
    createteacher:"digischool/createteacher",
    deleteteacher:"digischool/deleteteacher",
    updateteacher:"digischool/updateteacher",
    //classes routes
    getallclasses:"digischool/classes",
    getspecificclass:"digischool/class",
    createclass:"digischool/createclass",
    deleteclass:"digischool/deleteclass",
    updateclass:"digischool/updateclass",
    //enrollment(admisisons) routes
    getenrollmentofaclass:"digischool/enrollment",
    getspecificenrollment:"digischool/enrollment/student",
    createenrollment:"digischool/createenrollment",
    deleteenrollment:"digischool/deleteenrollment",
    updateenrollment:"digischool/updateenrollment",
    //Results routes
    getresultofaclass:"digischool/getresult",
    getspecificstudentresult:"digischool/result/student",
    createresult:"digischool/createresult",
    deleteresult:"digischool/deleteresult",
    updateresult:"digischool/updateresult",
    //Attendance Routes
    getattendanceofdate:"digischool/getattendance",
    getspecificstudentattendanceofadate:"digischool/attendance/student",
    createattendance:"digischool/createattendance",
    deleteattendance:"digischool/deleteattendance",
    updateattendance:"digischool/updateattendance",
    //Accounts Routes
    gettransactionsdetail:"digischool/gettransactions",
    getspecifictransactionsdetailofadate:"digischool/transactions",
    createtransaction:"digischool/createtransaction",
    deletetransaction:"digischool/deletetransaction",
    updatetransaction:"digischool/updatetransaction",
    //Authentication Routes
    loginroute:"digischool/login",
    signuproute:"digischool/signup",
    getprofile:"digischool/profile",
    updateprofile:"digischool/updateprofile",
}


module.exports=routesname