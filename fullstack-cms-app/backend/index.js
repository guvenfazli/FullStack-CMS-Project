const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./utils/database.js')
const cors = require('cors')
const path = require('path')
const cookieparser = require('cookie-parser')
const multer = require('multer')
const cron = require('node-cron');
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

// M O D E L S 
const Admin = require('./models/Admin.js')
const Employee = require('./models/Employee.js')
const Project = require('./models/Project.js')
const Task = require('./models/Task.js')
const EmployeeTask = require('./models/EmployeeTask.js')
const Notification = require('./models/Notification.js')
const ProjectActivity = require('./models/ProjectActivity.js')

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

Project.hasMany(ProjectActivity, { onDelete: 'CASCADE', })
ProjectActivity.belongsTo(Project, { onDelete: 'CASCADE', })

Employee.hasMany(Notification, { onDelete: 'CASCADE', foreignKey: 'employeeId' })
Notification.belongsTo(Employee, { onDelete: 'CASCADE', foreignKey: 'employeeId' })

Task.hasMany(Notification, { onDelete: 'CASCADE', foreignKey: 'taskId' })
Notification.belongsTo(Task, { onDelete: 'CASCADE', foreignKey: 'taskId' })



sequelize.sync().then(async (res) => {
  server.listen(8080)
}).catch(err => console.log(err));


// W E B    S O C K E T S 

const io = require('./io').init(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
  }
})

io.use((socket, next) => {
  next()
})

const notifs = io.of('/notifs')
const projectsPage = io.of('/projectsPage')
const singleProjectPage = io.of('/singleProjectPage')
const homePage = io.of('/homePage')

const activeUsers = []

notifs.on('connection', (connectedEmployee) => {

  let activityTimer;
  let employeeId;

  connectedEmployee.on('createNotificationRoom', (userId) => { // Room is being created for notifications at the beginning.
    connectedEmployee.join(userId)
    employeeId = userId
    activeUsers.push(userId)
  })



  connectedEmployee.on('markAsRead', (userId) => {
    notifs.to(userId).emit('markRead')
  })

  connectedEmployee.on('disconnect', () => {
    const loggedOffEmployee = activeUsers.findIndex(emp => emp === employeeId)
    activeUsers.splice(loggedOffEmployee, 1)
    clearInterval(activityTimer)
  })

})

homePage.on('connection', (connectedEmployee) => {
  connectedEmployee.on('employeeCreated', (emp) => {
    homePage.emit('refreshEmployees', emp)
  })

  connectedEmployee.on('employeeDeleted', (emp) => {
    homePage.emit('refreshEmployees', emp)
  })

})


projectsPage.on('connection', (connectedEmployee) => {

  connectedEmployee.on('projectCreated', (emp) => {
    projectsPage.emit('refreshProjects', emp)
  })

  connectedEmployee.on('projectDeleted', (empList, projectName) => {
    projectsPage.emit('refreshProjects')

    if (empList) {
      for (const chosenEmp of empList) {
        notifs.to(chosenEmp.id).emit('sendNotif', `The project (${projectName}) you assigned has been deleted.`)
      }
    }
  })

  connectedEmployee.on('taskCreated', (projectId) => {
    projectsPage.emit('refreshProjects')
  })

  connectedEmployee.on('projectStatusChanged', (emp) => {
    projectsPage.emit('refreshProjects', emp)
  })

})


singleProjectPage.on('connection', (connectedEmployee) => {

  connectedEmployee.on('joinRoom', (projectId) => {
    connectedEmployee.join(projectId)
  })

  connectedEmployee.on('taskCreated', (projectId) => {
    singleProjectPage.to(projectId).emit('refreshTasks')
  })

  connectedEmployee.on('taskStatusChanged', (projectId) => {
    singleProjectPage.to(projectId).emit('refreshTasks')
  })

  connectedEmployee.on('taskDeleted', (projectId, empList, taskName) => {
    singleProjectPage.to(projectId).emit('refreshTasks')
    for (const chosenEmp of empList) {
      notifs.to(chosenEmp.id).emit('sendNotif', `The task (${taskName}) you assigned has been deleted.`)
    }

  })

  connectedEmployee.on('taskEdited', (projectId) => {
    singleProjectPage.to(projectId).emit('refreshTasks')
  })

  connectedEmployee.on('employeeAssigned', (projectId, chosenEmployees, taskId) => {
    singleProjectPage.to(projectId).emit('refreshTasks')

    for (const chosenEmp of chosenEmployees) {
      notifs.to(chosenEmp).emit('sendNotif', 'A task assigned to you!', projectId)
    }
  })

  connectedEmployee.on('employeeReassigned', (projectId, employeeId) => {
    singleProjectPage.to(projectId).emit('refreshTasks')
    notifs.to(employeeId).emit('sendNotif', 'You have been resigned from a task!', projectId)
  })

  connectedEmployee.on('disconnect', (projectId) => {
    connectedEmployee.leave(projectId)
  })

})

// N O D E - C R O N 

cron.schedule('*/30 * * * *', async () => {
  for (const activeEmp of activeUsers) {
    const foundEmployee = await Employee.findByPk(activeEmp)
    foundEmployee.activityPoints += 15
    await foundEmployee.save()
    notifs.to(activeEmp).emit('activityNotif', 'You just earned 15 activity points, keep it up!')
  }
})