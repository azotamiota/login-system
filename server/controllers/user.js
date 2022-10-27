const { getHash, compareHash } = require('../middleware/hash')
const {createToken} = require('../middleware/createToken')
const mysql = require("mysql2");
require('dotenv').config()
  
const db  = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password:  process.env.PASSWORD,
    database: "mydb"
});

const createUser = async (req, res) => {

    try {
        const email = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/.test(req.body.email) ? req.body.email : undefined
        const hashedPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(req.body.password) ?
            await getHash(req.body.password) : undefined
        if (!email || !hashedPassword) {
            res.status(400).json({success: false, message: 'Invalid email or password'})                
        } else {
            db.connect((err) => {
                if (err) {
                    console.log("Database Connection Failed !!!", err);
                    throw err;
                } else {
                    console.log("Connected to Database...");

                    const doesEmailExist = `SELECT * FROM users WHERE email = '${email}'`
                    db.query(doesEmailExist, (err, result) => {
                        if (err) {
                            console.log('Failed check for existing email: ', err)
                        } else {
                            console.log('result of email check: ', result)
                            if (result.length > 0) {
                                console.log('Email already registered.')
                                res.status(400).json({success: false, message: 'Email already registered.'})                
                            } else {

                                const createUser = `INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}');`
                                db.query(createUser, (err, result) => {
                                    if (err) {
                                        console.log('Failed to register user: ', err)
                                    } else {
                                        console.log('Successful registration!')
                                        res.status(201).json({success: true, email: email,  message: 'Successful registration!'})                
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
    } catch (error) {    
        console.log('Server error')                   
        res.status(500).json({success: false, message: error})
    }    
}

const login = async (req, res) => {

    try {        
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password:  process.env.PASSWORD,
            database: "mydb"
        });
        let response = await conn.execute(`SELECT * FROM users WHERE email = '${req.body.email}';`)
        if (response[0].length === 0) throw 'No user found with this email'
        const currentUser = response[0][0]['email']
        console.log('currentuser: ', currentUser)
        const hashedPassword = response[0][0]['password']
        let authenticated = await compareHash(req.body.password, hashedPassword)
        if(authenticated) {
            res.json({
                success: true,
                message: 'Successfully logged in',
                token: 'Bearer ' + await createToken(currentUser)
            })
            console.log('Successfully logged in')
        } else {
            throw 'Wrong credentials'
        }
    } catch (error) {
        console.log('Cannot authorize: ', error)                    
        res.status(401).json({
            success: false,
            message: error
        })
    }
}

module.exports = {
    createUser,
    login
}
