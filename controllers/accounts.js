const ResponseManager = require("../helpers/Message");
const { mailusers } = require("../helpers/senEmail");
const Enrollments = require("../models/Enrollments")
const Users=require("../models/Users")
const Admins=require("../models/Admins")
const Teachers=require("../models/Teachers")
const Classes=require("../models/Classes")
const Students=require("../models/Students")
const Accounts=require("../models/Accounts")
const { Sequelize, DataTypes,Op } = require('sequelize');
const createOrUpdateAccountRecord = async (req, res) => {
    if (req?.user?.data?.role === "admin") {
      const { date, stationary_spending,  fee_received, bill_paid, stationary_earning, salaries_paid,others } = req.body;
  
      try {
        // Check if record for this month already exists
        const existingRecord = await Accounts.findOne({ where: Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("date")), "=", new Date(date).getMonth() + 1) });
        if (existingRecord) {
          // Update existing record
          existingRecord.stationary_spending = stationary_spending;
          existingRecord.fee_received = fee_received;
          existingRecord.bill_paid = bill_paid;
          existingRecord.stationary_earning = stationary_earning;
          existingRecord.salaries_paid = salaries_paid;
          existingRecord.others=others
          await existingRecord.save();
          return res.status(200).json(ResponseManager.successResponse({}, "Record updated successfully."));
        } else {
          // Create new record
          await Accounts.create({
            date,
            stationary_spending,
            fee_received,
            bill_paid,
            stationary_earning,
            salaries_paid,
            others
          });
          return res.status(200).json(ResponseManager.successResponse({}, "Record created successfully."));
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res.status(500).json(ResponseManager.errorResponse("Only admin can perform this action.", 500));
    }
  };
//delete a statements

const deleteStatement = async (req, res) => {
    if (req?.user?.data?.role === "admin") {
      const { id } = req.body||req.query; // or req.query, depending on how the client sends the request
  
      try {
        // Check if record exists
        const existingRecord = await Accounts.findByPk(id);
        if (existingRecord) {
          await existingRecord.destroy();
          return res.status(200).json(ResponseManager.successResponse({}, "Record deleted successfully."));
        } else {
          return res.status(404).json(ResponseManager.errorResponse("Record not found.", 404));
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json(ResponseManager.errorResponse());
      }
    } else {
      return res.status(500).json(ResponseManager.errorResponse("Only admin can perform this action.", 500));
    }
  };
  //get all acounts record
  const getAllAccounts = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // default to page 1 if query param is not provided
    const limit = parseInt(req.query.limit) || 10; // default to limit 10 if query param is not provided
  
    try {
      const accounts = await Accounts.findAndCountAll({
        offset: (page - 1) * limit,
        limit: limit,
      });
  
      const totalPages = Math.ceil(accounts.count / limit); // calculate total number of pages
  
      return res.status(200).json(
        ResponseManager.successResponse(
          {
            accounts: accounts.rows,
            currentPage: page,
            totalPages: totalPages,
            totalCount: accounts.count,
          },
          "Accounts retrieved successfully."
        )
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json(ResponseManager.errorResponse());
    }
  };
//ACCOUNTS TIME FRAME API
const getAccountsByTimeFrame = async (req, res) => {
  const { timeframe } = req.body||req.query;

  // Check if timeframe is provided
  if (!timeframe) {
    return res.status(400).json(ResponseManager.errorResponse("Timeframe is required."));
  }

  try {
    // Calculate date range based on timeframe input
    let dateRange;
    const currentDate = new Date();
    if (timeframe === "6 months") {
      dateRange = {
        startDate: new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1),
        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0),
      };
    } else if (timeframe === "1 year") {
      dateRange = {
        startDate: new Date(currentDate.getFullYear() - 1, 0, 1),
        endDate: new Date(currentDate.getFullYear(), 0, 0),
      };
    } else if (timeframe === "5 years") {
      dateRange = {
        startDate: new Date(currentDate.getFullYear() - 5, 0, 1),
        endDate: new Date(currentDate.getFullYear(), 0, 0),
      };
    } else {
      return res.status(400).json(ResponseManager.errorResponse("Invalid timeframe."));
    }

    // Query accounts table for records within the date range
    const accounts = await Accounts.findAll({
      where: {
        date: {
          [Op.between]: [dateRange.startDate, dateRange.endDate],
        },
      },
    });

    
    // Calculate total expenses and earnings for the date range
    const { totalExpense, totalEarning } = calculateTotal(accounts);

    return res.status(200).json(ResponseManager.successResponse({ totalExpense, totalEarning }, "Accounts data retrieved successfully."));
  } catch (error) {
    console.error(error);
    return res.status(500).json(ResponseManager.errorResponse());
  }
};

//extar calcultaions

function calculateTotal(accounts) {
  let totalExpense = 0;
  let totalEarning = 0;

  accounts.forEach(account => {
    const {stationary_spending,  fee_received, bill_paid, stationary_earning, salaries_paid,others}=account
    totalExpense += stationary_spending+bill_paid+salaries_paid+others;
    totalEarning += fee_received+stationary_earning;
  });

  return { totalExpense, totalEarning };
}

  module.exports={createOrUpdateAccountRecord,deleteStatement,getAllAccounts,getAccountsByTimeFrame}