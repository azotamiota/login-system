const mysql = require("mysql2");
const fs = require('fs');
require('dotenv').config()
  
const dbHost = process.env.HOST
const dbUser = process.env.USER
const dbPassword = process.env.PASSWORD

const db = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: 'mydb'
});

const table = fs.readFileSync(__dirname + '/db/1_create_users.sql').toString();

db.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("Connected to Database..."); 
      db.query(table, (err, res) => {
        if (err) console.log('Failed to create table: ', err);
          console.log('Success! Table created')
        db.end()
        console.log('Disconnected from Database');
      })
    }
});
