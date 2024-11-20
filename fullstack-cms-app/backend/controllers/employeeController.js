const Employee = require('../models/Employee')
const Admin = require('../models/Admin')
const Project = require('../models/Project')
const Task = require('../models/Task')
const EmployeeTask = require('../models/EmployeeTask')
const Notification = require('../models/Notification')
const ProjectActivity = require('../models/ProjectActivity')


const sequelize = require('../utils/database')
const { Op } = require('sequelize')
const { throwError } = require('../middleware/throwError')
const { validationResult } = require('express-validator')



exports.fetchAllAdmins = async (req, res, next) => {
  try {

    const allAdmins = await Admin.findAll({
      include: [
        { model: Employee, include: [{ model: Task, attributes: ['id'] }], attributes: ['id', 'name', 'surname', 'email', 'jobTitle', 'profilePic', 'createdAt', 'completedTasks', 'isAdmin'] }
      ]
    })

    if (allAdmins.length === 0) {
      throwError('Admins could not found!', 404)
    }

    return res.json({ allAdmins })
  } catch (err) {
    next(err)
  }

}

exports.fetchEmployeeData = async (req, res, next) => {
  try {
    const countedEmployees = await Employee.count()

    if (!countedEmployees) {
      throwError('Could not fetch the stats!', 404)
    }

    return res.json({ totalUsers: countedEmployees })

  } catch (err) {
    next(err)
  }
}

exports.fetchAllEmployees = async (req, res, next) => {

  const searchParam = req.query.employee
  const filterParam = req.query.filter
  let employeeName = searchParam
  let employeeSurname;
  let foundEmployees
  let allEmployees
  console.log(filterParam)
  try {

    if (searchParam) {

      if (searchParam.includes(' ')) {
        const fullName = searchParam.split(' ')
        employeeName = fullName[0]
        employeeSurname = fullName[1]
      }

      foundEmployees = await Employee.findAll({
        order: [filterParam ? filterParam : 'id'],
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${employeeName}%` } },
            { surname: { [Op.like]: `%${employeeSurname}%` } }]
        },
        attributes: ['id', 'profilePic', 'name', 'surname', 'email', 'isAdmin', 'jobTitle']
      })

      if (foundEmployees.length === 0) {
        throwError('Employees could not found!', 404)
      }

      return res.json({ employees: foundEmployees })
    }

    allEmployees = await Employee.findAll({ order: [filterParam ? filterParam : 'id'], attributes: ['id', 'profilePic', 'name', 'surname', 'email', 'isAdmin', 'completedTasks', 'jobTitle'], include: { model: Task, attributes: ['id', 'taskName', 'taskStatus', 'projectId'] } })

    if (allEmployees.length === 0) {
      throwError('Employees could not found!', 404)
    }

    return res.json({ employees: allEmployees })
  } catch (err) {
    next(err)
  }

}

exports.fetchSingleEmployee = async (req, res, next) => {
  const chosenEmployeeId = req.params.chosenEmployeeId
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7)

  try {
    const foundEmployee = await Employee.findByPk(chosenEmployeeId, {
      attributes: ['id', 'profilePic', 'name', 'surname', 'email', 'isAdmin', 'jobTitle', 'birthDate', 'phoneNumber', 'completedTasks', 'productivityPoints', 'activityPoints', 'createdAt'],
      include: { model: Task, attributes: ['id', 'taskName', 'taskStatus', 'projectId', 'taskDeadline'] }
    })

    const foundEmployeeStats = await EmployeeTask.findAll({
      where: { employeeId: chosenEmployeeId, taskStatus: 'Completed', updatedAt: { [Op.between]: [lastWeek, today] } }, attributes: [[sequelize.fn('DATE', sequelize.col('updatedAt')), 'date'], [sequelize.fn('COUNT', sequelize.col('taskStatus')), 'counted']], group: ['date']
    })

    if (!foundEmployee) {
      throwError('Employee not found!', 404)
    }

    return res.json({ foundEmployee, foundEmployeeStats })

  } catch (err) {
    next(err)
  }

}

exports.editEmployeeAccount = async (req, res, next) => {
  const chosenEmployeeId = req.params.chosenEmployeeId
  const { name, surname, email, jobTitle, birthDate, phoneNumber } = req.body;
  const errors = validationResult(req)


  try {
    const foundEmployee = await Employee.findByPk(chosenEmployeeId)

    if (!foundEmployee) {
      throwError('Employee not found!', 404)
    } else if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 404)
    }

    foundEmployee.name = name
    foundEmployee.surname = surname
    foundEmployee.email = email
    foundEmployee.jobTitle = jobTitle
    foundEmployee.birthDate = birthDate
    foundEmployee.phoneNumber = phoneNumber

    await foundEmployee.save()

    return res.json({ message: 'Changes saved!' })

  } catch (err) {
    next(err)
  }
}

exports.fetchProjects = async (req, res, next) => {
  const searchParam = req.query.project
  const filterParam = req.query.filterParam
  let foundProjects;
  let allProjects;

  try {

    if (searchParam) {
      foundProjects = await Project.findAll({ order: [filterParam ? filterParam : 'id'], where: { projectName: { [Op.like]: `%${searchParam}%` } }, include: [{ model: Task, }] })
      if (foundProjects.length === 0) {
        throwError('Could not fetch projects!', 404)
      }
      return res.json({ projects: foundProjects })
    }

    allProjects = await Project.findAll({
      order: [filterParam],
      include: [
        {
          model: Task,
          include: [
            {
              model: Employee,
              attributes: ['id', 'name']
            }
          ]
        }
      ],

    })

    if (allProjects.length === 0) {
      throwError('Could not fetch projects!', 404)
    }


    return res.json({ projects: allProjects })

  } catch (err) {
    next(err)
  }

}

exports.fetchProjectStats = async (req, res, next) => {
  try {
    const totalProjects = await Project.count()
    const projectStatusData = await Project.findAll({ attributes: ['projectStatus', [sequelize.fn('COUNT', sequelize.col('projectStatus')), 'counted']], group: ['projectStatus'] })

    if (totalProjects === undefined || projectStatusData === undefined) {
      throwError('Could not fetch stats!', 404)
    }

    return res.json({ totalProjects, projectStatusData })

  } catch (err) {
    next(err)
  }

}

exports.fetchSingleProject = async (req, res, next) => {

  const projectId = req.params.projectId

  try {
    const fetchedProject = await Project.findByPk(projectId, {
      include: [
        {
          model: Task,
          include: [
            {
              model: Employee,
              attributes: ['id', 'name', 'surname', 'profilePic', 'jobTitle']
            }
          ]
        },
        {
          model: ProjectActivity
        }
      ]
    })

    const projectTasks = await Task.findAll({
      where: { projectId: projectId }, include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'surname', 'profilePic', 'jobTitle']
        }
      ]
    })

    const groupList = []

    fetchedProject.tasks.forEach((task) => {
      task.employees.forEach((employee) => {
        const foundEmp = groupList.find((emp) => emp.id === employee.id)
        if (!foundEmp) {
          groupList.push(employee)
        }
      })
    })

    if (!fetchedProject) {
      throwError('Project not found!', 404)
    }

    return res.json({ fetchedProject, groupList, projectTasks })

  } catch (err) {
    next(err)
  }
}

exports.fetchTasks = async (req, res, next) => {
  const projectId = req.params.projectId
  const filterParam = req.query.filter
  const searchParam = req.query.task

  try {

    if (searchParam) {
      const foundTasks = await Task.findAll({
        order: [filterParam ? filterParam : 'id'], where: { taskName: { [Op.like]: `%${searchParam}%` }, projectId: projectId }, include: [
          {
            model: Employee,
            attributes: ['id', 'name', 'surname', 'profilePic', 'jobTitle']
          }
        ]
      })
      if (foundTasks.length === 0) {
        throwError('Could not fetch projects!', 404)
      }
      return res.json({ tasks: foundTasks })
    }


    const projectTasks = await Task.findAll({
      order: [filterParam ? filterParam : 'id'],
      where: { projectId: projectId }, include: [
        {
          model: Employee,
          attributes: ['id', 'name', 'surname', 'profilePic', 'jobTitle']
        }
      ]
    })



    return res.json({ tasks: projectTasks })

  } catch (err) {
    next(err)
  }


}

exports.changeTaskStatus = async (req, res, next) => {
  const { taskStatus } = req.body
  const taskId = req.params.taskId
  const foundTask = await Task.findByPk(taskId)

  if (taskStatus === 'Completed') {
    const assignedEmployeesList = await EmployeeTask.findAll({ where: { taskId: taskId } })

    for (const task of assignedEmployeesList) {
      const assignedEmployee = await Employee.findByPk(task.employeeId)
      assignedEmployee.completedTasks += 1
      if (assignedEmployee.completedTasks % 5 === 0) {
        assignedEmployee.productivityPoints += 3
      }
      task.taskStatus = 'Completed'
      await assignedEmployee.save()
      await task.save()
    }

  } else if (taskStatus === 'Cancelled') {
    const assignedEmployeesList = await EmployeeTask.findAll({ where: { taskId: taskId } })

    for (const cancelledTask of assignedEmployeesList) {
      await cancelledTask.destroy()
    }
  } else {

    const alreadyCompletedTask = await EmployeeTask.findOne({ where: { taskId: taskId } })


    if (alreadyCompletedTask && alreadyCompletedTask.taskStatus === 'Completed') {
      const assignedEmployeesList = await EmployeeTask.findAll({ where: { taskId: taskId } })

      for (const task of assignedEmployeesList) {
        const assignedEmployee = await Employee.findByPk(task.employeeId)

        if (assignedEmployee.completedTasks % 5 === 0) {
          assignedEmployee.productivityPoints -= 3
        }

        if (assignedEmployee.completedTasks !== 0) {
          assignedEmployee.completedTasks -= 1
        }

        assignedEmployee.addTask(foundTask)
        task.taskStatus = taskStatus
        await task.save()
        await assignedEmployee.save()
      }

    }

    foundTask.taskStatus = taskStatus
    await foundTask.save()
  }

  foundTask.taskStatus = taskStatus
  await foundTask.save()
  return res.json({ message: 'Status changed.' })
}

exports.fetchNotifications = async (req, res, next) => {
  try {
    const fetchedNotifications = await Notification.findAll({ where: { employeeId: req.user.userId } })

    if (!fetchedNotifications) {
      throwError('Could not get notifications!', 404)
    }

    return res.json({ fetchedNotifications })

  } catch (err) {
    next(err)
  }

}

exports.markNotificationsAsRead = async (req, res, next) => {
  try {
    const fetchedNotifications = await Notification.findAll({ where: { employeeId: req.user.userId } })

    if (!fetchedNotifications) {
      throwError('Could not get notifications!', 404)
    }

    for (const notification of fetchedNotifications) {
      notification.isRead = true
      await notification.save()
    }

    await fetchedNotifications.save()


  } catch (err) {
    next(err)
  }
}