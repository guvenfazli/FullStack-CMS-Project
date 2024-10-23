const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./utils/database.js')
// M O D E L S 
const Employee = require('./models/Employee.js')
const Admin = require('./models/Admin.js')

// R O U T E R S 

const authRouter = require('./routes/authRoute.js')

// M I D D L E W A R E S 

app.use(bodyParser.json()) // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, ChatUserId')
  next();
})

app.use('/auth', authRouter)

app.use((error, req, res, next) => {
  const message = error.message
  const statusCode = error.statusCode
  res.status(statusCode).json({ message: message })
})




// R E L A T I O N S 

Employee.hasOne(Admin, { onDelete: 'CASCADE', foreignKey: 'employeeId' })
Admin.belongsTo(Employee, { onDelete: 'CASCADE', foreignKey: 'employeeId' })



sequelize.sync().then(async res => {

  app.listen(8080)
}).catch(err => console.log(err));