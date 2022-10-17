const express = require('express')
const app = express()
const cors = require('cors')
const userController = require('./controllers/user')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {res.json({message: 'Welcome to Login System'})})
app.post('/register', userController.createUser)
app.post('/login', userController.login)

module.exports = app;
