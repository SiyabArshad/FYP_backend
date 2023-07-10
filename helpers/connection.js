const { Sequelize } = require('sequelize');

async function connectToDatabase() {
  try {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.DB_PASSWORD, {
      host: process.env.HOST,
      dialect: 'mysql',
    });
    console.log('Connected to MySQL database successfully.');
    return sequelize;
  } catch (error) {
    console.error('An error occurred while connecting to MySQL database:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
