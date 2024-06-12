const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'nagham1618',
  password: 'Nagham_1618',
  database: 'GreenThumb',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

//to check connection

module.exports = connection;