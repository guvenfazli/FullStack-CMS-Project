const Employee = require('../models/Employee')
const Project = require('../models/Project')
const Task = require('../models/Task')
const EmployeeTask = require('../models/EmployeeTask')

const fs = require('fs')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const path = require('path')
const { Op } = require('sequelize')
const { throwError } = require('../middleware/throwError') // (errorMessage, statusCode)

const clearImage = (imageUrl) => {
  const filePath = path.join(__dirname, '..', imageUrl)
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        throwError('Image could not delete', 420)
      }
    })
  } catch (err) {
    next(err)
  }
}



exports.createEmployee = async (req, res, next) => {
  const { name, surname, email, password, jobTitle, birthDate, phoneNumber } = req.body;
  const errors = validationResult(req)

  try {
    const foundEmployee = await Employee.findOne({ where: { email: email } })

    if (foundEmployee) {
      throwError('Email Aready Exists!', 400)
    } else if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg)
      error.statusCode = 410
      throw error
    } else if (req.files.length === 0) {
      throwError('Profile picture is required', 404)
    }

    const profilePic = req.files[0].path
    const hashedPw = await bcrypt.hash(password, 12)

    Employee.create({
      name: name,
      surname: surname,
      email: email,
      password: hashedPw,
      jobTitle: jobTitle,
      birthDate: birthDate,
      phoneNumber: phoneNumber,
      profilePic: profilePic
    })

    return res.json({ message: 'Account Successfully Created!' })
  } catch (err) {
    next(err)
  }

}

exports.deleteEmployee = async (req, res, next) => {
  const chosenEmployeeId = req.params.employeeId

  try {
    const foundEmployee = await Employee.findByPk(chosenEmployeeId)

    if (!foundEmployee) {
      throwError('Employee could not found!', 400)
    }

    foundEmployee.destroy()
    clearImage(foundEmployee.profilePic)
    return res.json({ message: 'Employee deleted successfully.' })
  } catch (err) {
    next(err)
  }

}

exports.createProject = async (req, res, next) => {
  const { projectTitle, deadline } = req.body
  const errors = validationResult(req)

  try {

    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg)
      error.statusCode = 400
      throw error
    }

    const createdProject = await Project.create({
      projectName: projectTitle,
      deadline: deadline
    })

    createdProject.createProjectActivity({
      activity: 'Project Created'
    })

    if (!createdProject) {
      throwError('Something went wrong.', 400)
    }

    return res.json({ message: 'Project Created!' })

  } catch (err) {
    next(err)
  }

}

exports.editProject = async (req, res, next) => {
  const chosenProjectId = req.params.chosenProjectId

  const { projectName, deadLine, projectStatus } = req.body

  try {
    const foundProject = await Project.findByPk(chosenProjectId)
    const taskCheck = await Task.findOne({ where: { taskStatus: { [Op.or]: ['Active', 'Pending'] }, projectId: chosenProjectId } })

    if (taskCheck && projectStatus === ('Completed' || 'Cancelled')) {
      throwError('There are remaining tasks!', 400)
    }

    foundProject.projectName = projectName
    foundProject.deadLine = deadLine
    foundProject.projectStatus = projectStatus
    foundProject.save()

    foundProject.createProjectActivity({
      activity: 'Project Edited'
    })

    return res.json({ message: 'Status Updated' })

  } catch (err) {
    next(err)
  }

}

exports.deleteProject = async (req, res, next) => {
  const chosenProjectId = req.params.chosenProjectId

  try {

    const foundProject = await Project.findByPk(chosenProjectId)

    if (!foundProject) {
      throwError('Project could not found!', 404)
    }

    foundProject.destroy()
    return res.json({ message: 'Project deleted successfully.' })

  } catch (err) {
    next(err)
  }

}

exports.createTaskProject = async (req, res, next) => {
  const chosenProjectId = req.params.chosenProjectId
  const errors = validationResult(req)
  const { taskTitle, deadline } = req.body

  try {

    if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 400)
    }

    const foundProject = await Project.findByPk(chosenProjectId)

    if (!foundProject) {
      throwError('Project could not found!', 404)

    } else if (foundProject.deadline < deadline) {
      throwError('Task Deadline can not be greater than Project Deadline!', 409)
    }

    foundProject.createTask({
      taskName: taskTitle,
      taskDeadline: deadline
    })

    foundProject.projectStatus = 'Pending'
    foundProject.save()

    foundProject.createProjectActivity({
      activity: 'Task Created'
    })

    return res.json({ message: 'Task created successfully.' })

  } catch (err) {
    next(err)
  }


}

exports.editProjectTask = async (req, res, next) => {
  const chosenTaskId = req.params.chosenTaskId
  const errors = validationResult(req)
  const { taskTitle, deadline } = req.body

  try {

    if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 400)
    }

    const foundTask = await Task.findByPk(chosenTaskId)
    foundTask.taskName = taskTitle
    foundTask.taskDeadline = deadline
    foundTask.save()
    return res.json({ message: 'Task edited.' })

  } catch (err) {
    next(err)
  }


}

exports.deleteProjectTask = async (req, res, next) => {
  const chosenTaskId = req.params.chosenTaskId
  const chosenProjectId = req.params.chosenProjectId

  const foundProject = await Project.findByPk(chosenProjectId)

  try {
    const foundTask = await Task.findByPk(chosenTaskId)
    if (!foundTask) {
      throwError('Task could not found', 404)
    }

    foundTask.destroy()
    foundProject.createProjectActivity({
      activity: 'Task Deleted.'
    })
    return res.json({ message: 'Task deleted successfully.' })

  } catch (err) {
    next(err)
  }
}

exports.assignEmployees = async (req, res, next) => {
  const chosenTaskId = req.params.chosenTaskId
  const assignedProjectId = req.params.assignedProjectId
  const assignedEmployeeList = req.body
  const errors = validationResult(req)

  const foundTask = await Task.findByPk(chosenTaskId)
  const foundProject = await Project.findByPk(assignedProjectId)
  
  try {

    if (!errors.isEmpty()) {
      throwError(errors.array()[0].msg, 404)
    }

    for (const employee of assignedEmployeeList) {
      const foundEmployee = await Employee.findByPk(employee)
      if (!foundEmployee) {
        throwError('Employee could not found!', 404)
      }
      foundEmployee.addTask(foundTask)

      await foundEmployee.createNotification({ // Creates the notification.
        notificationMessage: 'A Task Assigned To You!',
        assignedBy: req.user.userId,
        projectId: +assignedProjectId,
        taskId: chosenTaskId
      })
    }

    foundTask.taskStatus = 'Pending'
    foundTask.save()

    foundProject.createProjectActivity({
      activity: 'Employee Assigned'
    })

    return res.json({ message: 'Employees assigned.' })
  } catch (err) {
    next(err)
  }

}

exports.resignEmployees = async (req, res, next) => {
  const chosenTaskId = req.params.chosenTaskId
  const chosenEmployeeId = req.params.chosenEmployeeId
  const chosenProjectId = req.params.chosenProjectId

  const foundTask = await Task.findByPk(chosenTaskId)
  const foundEmployee = await Employee.findByPk(chosenEmployeeId)
  const chosenProject = await Project.findByPk(chosenProjectId)

  try {
    await foundEmployee.removeTask(foundTask)

    const currentTaskStatus = await EmployeeTask.findOne({ where: { taskId: foundTask.id } })

    if (currentTaskStatus === null) {
      foundTask.taskStatus = 'Active'
      foundTask.save()
    }

    await foundEmployee.createNotification({ // Creates the notification.
      notificationMessage: 'You have been resigned from a task!',
      assignedBy: req.user.userId,
      projectId: chosenProjectId,
      taskId: chosenTaskId
    })


    chosenProject.createProjectActivity({
      activity: 'Employee Resigned'
    })

    return res.json({ message: 'Employees resigned.' })
  } catch (err) {
    next(err)
  }

}