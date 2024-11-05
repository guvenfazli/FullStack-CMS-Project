const Employee = require('../models/Employee')
const Admin = require('../models/Admin')
const Project = require('../models/Project')
const Task = require('../models/Task')
const EmployeeTask = require('../models/EmployeeTask')

const fs = require('fs')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const path = require('path')
const { Op } = require('sequelize')

const clearImage = (imageUrl) => {
  const filePath = path.join(__dirname, '..', imageUrl)
  try {
    fs.unlink(filePath, (err) => {
      if (err) {
        const error = new Error('Something happened')
        error.statusCode = 420
        throw error
      }
    })
  } catch (err) {
    next(err)
  }
}

exports.createEmployee = async (req, res, next) => {
  const { name, surname, email, password, jobTitle, birthdate, phoneNumber } = req.body;
  const profilePic = req.files[0].path

  try {
    const foundUser = await Employee.findOne({ where: { email: email } })

    if (foundUser) {
      const error = new Error('Email Already Exists!')
      error.statusCode = 415
      throw error
    }

    const hashedPw = await bcrypt.hash(password, 12)

    Employee.create({
      name: name,
      surname: surname,
      email: email,
      password: hashedPw,
      jobTitle: jobTitle,
      birthDate: birthdate,
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
    const foundUser = await Employee.findByPk(chosenEmployeeId)

    if (!foundUser) {
      const error = new Error('User could not found!')
      error.statusCode = 414
      throw error
    }

    foundUser.destroy()
    clearImage(foundUser.profilePic)
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
      error.statusCode = 410
      throw error
    }

    const createdProject = await Project.create({
      projectName: projectTitle,
      deadline: deadline
    })

    if (!createdProject) {
      const error = new Error('Something went wrong.')
      error.statusCode = 420
      throw error
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
      const error = new Error('There are remaining tasks!')
      error.statusCode = 434
      throw error
    }

    foundProject.projectName = projectName
    foundProject.deadLine = deadLine
    foundProject.projectStatus = projectStatus

    foundProject.save()

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
      const error = new Error('Project could not found!')
      error.statusCode = 420
      throw error
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
      const error = new Error(errors.array()[0].msg)
      error.statusCode = 410
      throw error
    }

    const foundProject = await Project.findByPk(chosenProjectId)

    if (!foundProject) {
      const error = new Error('Project could not found!')
      error.statusCode = 420
      throw error
    } else if (foundProject.deadline < deadline) {
      const error = new Error('Task Deadline can not be greater than Project Deadline!')
      error.statusCode = 418
      throw error
    }

    foundProject.createTask({
      taskName: taskTitle,
      taskDeadline: deadline
    })

    foundProject.projectStatus = 'Pending'
    foundProject.save()

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
      const error = new Error(errors.array()[0].msg)
      error.statusCode = 410
      throw error
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

  try {
    const foundTask = await Task.findByPk(chosenTaskId)
    if (!foundTask) {
      const error = new Error('Task could not found!')
      error.statusCode = 420
      throw error
    }

    foundTask.destroy()
    return res.json({ message: 'Task deleted successfully.' })

  } catch (err) {
    next(err)
  }
}

exports.assignEmployees = async (req, res, next) => {
  const chosenTaskId = req.params.chosenTaskId
  const assignedEmployeeList = req.body

  const foundTask = await Task.findByPk(chosenTaskId)

  try {
    assignedEmployeeList.forEach(async (employee) => {
      const foundEmployee = await Employee.findByPk(employee)
      if (!foundEmployee) {
        const error = new Error('Employee could not found!')
        error.statusCode = 420
        throw error
      }
      foundEmployee.addTask(foundTask)
    });
    foundTask.taskStatus = 'Pending'
    foundTask.save()
    return res.json({ message: 'Employees assigned.' })
  } catch (err) {
    next(err)
  }

}

exports.resignEmployees = async (req, res, next) => {
  const chosenTaskId = req.params.chosenTaskId
  const chosenEmployeeId = req.params.chosenEmployeeId

  const foundTask = await Task.findByPk(chosenTaskId)
  const foundEmployee = await Employee.findByPk(chosenEmployeeId)

  try {
    await foundEmployee.removeTask(foundTask)

    const currentTaskStatus = await EmployeeTask.findOne({ where: { taskId: foundTask.id } })

    if (currentTaskStatus === null) {
      foundTask.taskStatus = 'Active'
      foundTask.save()
    }

    return res.json({ message: 'Employees resigned.' })
  } catch (err) {
    next(err)
  }

}