const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'adminadmin',
      database: 'digischool'
    });
    console.log('Connected to MySQL database successfully.');
    return connection;
  } catch (error) {
    console.error('An error occurred while connecting to MySQL database:', error);
    throw error;
  }
}

module.exports=connectToDatabase