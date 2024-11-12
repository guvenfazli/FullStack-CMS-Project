const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./utils/database.js')
const cors = require('cors')
const path = require('path')
const cookieparser = require('cookie-parser')
const multer = require('multer')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

// M O D E L S 
const Admin = require('./models/Admin.js')
const Employee = require('./models/Employee.js')
const Project = require('./models/Project.js')
const Task = require('./models/Task.js')
const EmployeeTask = require('./models/EmployeeTask.js')

// R O U T E R S 

const authRouter = require('./routes/authRoute.js')
const employeeRouter = require('./routes/userRoute.js')
const adminRouter = require('./routes/adminRoute.js')

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

app.use('/admin', adminRouter)
app.use('/auth', authRouter)
app.use('/', employeeRouter)

app.use((error, req, res, next) => {
  const message = error.message
  const statusCode = error.statusCode || 500
  res.status(statusCode).json({ message })
})

// R E L A T I O N S 

Employee.hasOne(Admin, { onDelete: 'CASCADE', foreignKey: 'employeeId' })
Admin.belongsTo(Employee, { onDelete: 'CASCADE', foreignKey: 'employeeId' })
Project.hasMany(Task, { onDelete: 'CASCADE', foreignKey: 'projectId' })
Task.belongsTo(Project, { onDelete: 'CASCADE', foreignKey: 'projectId' })

Employee.belongsToMany(Task, { through: EmployeeTask })
Task.belongsToMany(Employee, { through: EmployeeTask })


sequelize.sync().then(async (res) => {
  server.listen(8080)
}).catch(err => console.log(err));


// W E B    S O C K E T S 

const io = require('./io').init(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }
})

io.use((socket, next) => {
  next()
})

const homePage = io.of('/homePage')

homePage.on('connection', (connectedEmployee) => {
  connectedEmployee.on('employeeCreated', (emp) => {
    homePage.emit('refreshEmployees', emp)
  })

  connectedEmployee.on('employeeDeleted', (emp) => {
    homePage.emit('refreshEmployees', emp)
  })

})

const projectsPage = io.of('/projectsPage')

projectsPage.on('connection', (connectedEmployee) => {
  console.log('It is here')

  connectedEmployee.on('projectCreated', (emp) => {
    projectsPage.emit('refreshProjects', emp)
  })

  connectedEmployee.on('projectDeleted', (emp) => {
    projectsPage.emit('refreshProjects', emp)
  })

  connectedEmployee.on('projectStatusChanged', (emp) => {
    projectsPage.emit('refreshProjects', emp)
  })

})

const singleProjectPage = io.of('/singleProjectPage')

singleProjectPage.on('connection', (connectedEmployee) => {
  const projectId = connectedEmployee.handshake.query.projectId
  connectedEmployee.join(projectId)

  connectedEmployee.on('taskStatusChanged', (emp) => {
    singleProjectPage.to(projectId).emit('refreshTasks', emp)
  })

  connectedEmployee.on('taskDeleted', (emp) => {
    singleProjectPage.to(projectId).emit('refreshTasks', emp)
  })

  connectedEmployee.on('taskEdited', (emp) => {
    singleProjectPage.to(projectId).emit('refreshTasks', emp)
  })

})