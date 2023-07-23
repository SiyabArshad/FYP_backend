const routesname = {
  //routes of our application
  //students Routes Tested Routes All Cleared
  getallstudents: "/digischool/students", //created api admin can acess it
  getspecificstudent: "/digischool/student", //created api student can acess it
  createstudent: "/digischool/createstudent", //created api admin and Teacher can acess it
  deletestudent: "/digischool/deletestudent", //created api admin can acess it
  updatestudent: "/digischool/updatestudent", //created api student can acess it
  studentcount: "/digischool/studentcount",
  studentlist: "/digischool/studentlist",
  //teachers Routes Tested Routes All Cleared
  getallteachers: "/digischool/teachers", //created api admin can acess it
  getspecificteacher: "/digischool/teacherprofile", //created api teacher can get profile
  createteacher: "/digischool/createteacher", //created api only admin can create the teachers
  deleteteacher: "/digischool/deleteteacher", //craeted api only admin can delete teachers
  updateteacher: "/digischool/updateteacher", //created api only Teacher can Update
  taechercount: "/digischool/teachercount",
  getoverallteachers: "/digischool/allteachers",

  //classes Routes Tested Routes All Cleared
  getallclasses: "/digischool/teachers/classes", //operation can be performed by  Teacher
  getspecificclass: "/digischool/class", //operation can be performed by  Teacher
  createclass: "/digischool/createclass", //operation can be performed by  Teacher
  deleteclass: "/digischool/deleteclass", //operation can be performed by  Teacher
  updateclass: "/digischool/updateclass", //operation can be performed by  Teacher
  getoverallclasses: "/digischool/allclasses",
  changeclassteacher: "/digischool/changeteacher",
  //enrollment(admisisons) Routes Tested Routes All Cleared
  getenrollmentofaclass: "/digischool/enrollment", //only teacher have acess
  getspecificenrollment: "/digischool/enrollment/student", //only Student have acess
  createenrollment: "/digischool/createenrollment", //only teacher have acess
  deleteenrollment: "/digischool/deleteenrollment", //only teacher have acess
  updateenrollment: "/digischool/updateenrollment", //only teacher have acess
  //Results Routes Tested Routes All Cleared
  getresultofaclass: "/digischool/getresult", //only teacher and student have acess
  createresult: "/digischool/createresult", //only teacher have acess
  deleteresult: "/digischool/deleteresult", //only teacher have acess
  updateresult: "/digischool/updateresult", //only teacher have acess
  //Attendance Routes
  getattendanceofdate: "/digischool/getattendance",
  getspecificstudentattendanceofadate: "/digischool/attendance/date",
  createattendance: "/digischool/createattendance",
  deleteattendance: "/digischool/deleteattendance",
  updateattendance: "/digischool/updateattendance",
  //Accounts Statement Routes Tested Routes All Cleared
  gettransactionsdetail: "/digischool/gettransactions", //adminops
  getspecifictransactionsdetailofadate: "/digischool/financial/progress", //admin acess
  createtransaction: "/digischool/createtransaction", //admin ops
  deletetransaction: "/digischool/deletetransaction", //admin ops
  lastmonthexpense: "/digischool/lastmonthexpense",
  //Authentication+Admin Routes Tested Routes All Cleared
  loginroute: "/digischool/login", //api created and * access
  signuproute: "/digischool/createuser", //api created and only admin can create it
  getprofile: "/digischool/adminprofile", //api created and * access
  updateprofile: "/digischool/updateadminprofile", //api created and admin access
  resetUser: "/digischool/reset", //api created every one can update its account,
  passlink: "/digischool/passlink",
  resetpassword: "/digischool/newpassword",
};

module.exports = routesname;
