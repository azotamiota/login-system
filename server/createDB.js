const mysql = require("mysql2");
require('dotenv').config()

const dbHost = process.env.HOST
const dbUser = process.env.USER
const dbPassword = process.env.PASSWORD

const initialDB = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword
});

const database = 'mydb'

initialDB.connect((err) => {
    if (err) {
      console.log("Database connection failed!", err);
    } else {
      
      initialDB.query(`CREATE DATABASE ${database}`, (err, res) => {
        if (err) {
          console.log(`Failed to create "${database}" database:, ${err}`);
        } else {
          console.log(`Database "${database}" created`);
        }
        initialDB.end()
      })  
    }
})

