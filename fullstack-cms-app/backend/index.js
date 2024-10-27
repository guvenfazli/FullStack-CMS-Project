const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./utils/database.js')
const cors = require('cors')
const path = require('path')
const cookieparser = require('cookie-parser')
const multer = require('multer')

// M O D E L S 
const Employee = require('./models/Employee.js')
const Admin = require('./models/Admin.js')

// R O U T E R S 

const authRouter = require('./routes/authRoute.js')
const employeeRouter = require('./routes/userRoute.js')

// M I D D L E W A R E S 

const fileStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'employeePics')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}


app.use(cookieparser())
app.use(bodyParser.json()) // application/json
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).array('profilePic', 1))
app.use('/employeePics', express.static(path.join(__dirname, 'employeePics')))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
})

app.use('/auth', authRouter)
app.use('/', employeeRouter)

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