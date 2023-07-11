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
  // const timeframe="6 months"
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
  let totalExpense = Number(0);
  let totalEarning = Number(0);

  accounts.forEach(account => {
    const {stationary_spending,  fee_received, bill_paid, stationary_earning, salaries_paid,others}=account
    totalExpense += Number(stationary_spending)+Number(bill_paid)+Number(salaries_paid)+Number(others);
    totalEarning += Number(fee_received)+Number(stationary_earning);
  });

  return { totalExpense, totalEarning };
}

const lastMonthExpense = async (req, res) => {
  if (req?.user?.data?.role === "admin"||req?.user?.data?.role==="teacher") {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    try {
      // Calculate the previous month's date range
      const previousMonth = currentMonth - 1 > 0 ? currentMonth - 1 : 12;
      const previousYear = currentMonth - 1 > 0 ? currentYear : currentYear - 1;
      const previousMonthStartDate = new Date(`${previousYear}-${previousMonth}-01`);
      const previousMonthEndDate = new Date(`${currentYear}-${currentMonth}-01`);
      previousMonthEndDate.setDate(previousMonthEndDate.getDate() - 1);

      // Query the database to retrieve the total expenses for the previous month
      const totalExpenses = await Accounts.findOne({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('stationary_spending')), 'stationary_spending'],
          [Sequelize.fn('SUM', Sequelize.col('bill_paid')), 'bill_paid'],
          [Sequelize.fn('SUM', Sequelize.col('salaries_paid')), 'salaries_paid'],
          [Sequelize.fn('SUM', Sequelize.col('others')), 'others']
        ],
        where: {
          date: {
            [Sequelize.Op.between]: [previousMonthStartDate, previousMonthEndDate]
          }
        }
      });
      const exp=Number(totalExpenses?.others)+Number(totalExpenses?.bill_paid)+Number(totalExpenses?.salaries_paid)+Number(totalExpenses?.stationary_spending)
      return res.status(200).json(ResponseManager.successResponse(exp, "Total expenses of the previous month."));
    } catch (error) {
      console.error(error);
      return res.status(500).json(ResponseManager.errorResponse());
    }
  } else {
    return res.status(500).json(ResponseManager.errorResponse("Only admin can perform this action.", 500));
  }
};



//monthly data
const getAccountsByMonthlyTimeFrame = async (req, res) => {
  const { months } = req.query||req.headers;
  // const months=6
  // Check if months parameter is provided
  if (!months) {
    return res.status(400).json(ResponseManager.errorResponse("Months parameter is required."));
  }

  try {
    const currentDate = new Date();
    const dateRange = calculateDateRange(months, currentDate);

    // Query accounts table for records within the date range
    const accounts = await Accounts.findAll({
      where: {
        date: {
          [Op.between]: [dateRange.startDate, dateRange.endDate],
        },
      },
    });

    // Calculate total expenses and earnings for the date range
    const monthlyData = calculateMonthlyData(accounts);

    return res
      .status(200)
      .json(ResponseManager.successResponse(monthlyData, "Accounts data retrieved successfully."));
  } catch (error) {
    console.error(error);
    return res.status(500).json(ResponseManager.errorResponse());
  }
};

// Calculate date range based on months input
function calculateDateRange(months, currentDate) {
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - months + 1, 1);
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  return { startDate, endDate };
}

// Calculate total expenses and earnings for each month
function calculateMonthlyData(accounts) {
  const monthlyData = [];

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const { date, stationary_spending, fee_received, bill_paid, stationary_earning, salaries_paid, others } = account;

    const month = date.toLocaleString('default', { month: 'long' });
    const totalExpense = Number(stationary_spending) + Number(bill_paid) + Number(salaries_paid) + Number(others);
    const totalEarning = Number(fee_received) + Number(stationary_earning);

    monthlyData.push({ month, totalExpense, totalEarning });
  }

  return monthlyData;
}


  module.exports={createOrUpdateAccountRecord,deleteStatement,getAllAccounts,getAccountsByTimeFrame,lastMonthExpense,getAccountsByMonthlyTimeFrame}