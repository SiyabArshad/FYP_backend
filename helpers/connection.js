const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('Connected to MySQL database successfully.');
    return connection;
  } catch (error) {
    console.error('An error occurred while connecting to MySQL database:', error);
    throw error;
  }
}

module.exports=connectToDatabase