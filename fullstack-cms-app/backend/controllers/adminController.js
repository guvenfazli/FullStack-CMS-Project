const Employee = require('../models/Employee')
const Admin = require('../models/Admin')
const Project = require('../models/Project')
const Task = require('../models/Task')

const fs = require('fs')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const path = require('path')
const { Op } = require('sequelize')

const clearImage = (imageUrl) => {
  const filePath = path.join(__dirname, '..', imageUrl)
  try {
    fs.unlink(filePath, (err) => {
      const error = new Error('Something happened')
      error.statusCode = 420
      throw error
    })
  } catch (err) {
    next(err)
  }
}

exports.createEmployee = (req, res, next) => {
  const { name, surname, email, password, jobTitle } = req.body;
  const profilePic = req.files[0].path


  Employee.findOne({ where: { email: email } }).then(foundUser => {
    if (foundUser) {
      const error = new Error('Email Already Exists!')
      error.statusCode = 415
      throw error
    }

    bcrypt.hash(password, 12).then(hashedPw => {
      Employee.create({
        name: name,
        surname: surname,
        email: email,
        password: hashedPw,
        job_title: jobTitle,
        profilePic: profilePic
      }).then(createdUser => {
        return res.json({ message: 'Account Successfully Created!' })
      })
    })
  }).catch(err => next(err))

}

exports.deleteEmployee = (req, res, next) => {
  const chosenEmployeeId = req.params.employeeId

  Employee.findByPk(chosenEmployeeId).then(foundUser => {
    if (!foundUser) {
      const error = new Error('User could not found!')
      error.statusCode = 414
      throw error
    }
    clearImage(foundUser.profilePic)
    foundUser.destroy()
    return res.json({ message: 'Employee deleted successfully.' })
  })

}

exports.createProject = (req, res, next) => {
  const { projectTitle, deadline } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg)
    error.statusCode = 410
    throw error
  }

  Project.create({
    projectName: projectTitle,
    deadLine: deadline
  }).then(createdProject => {
    if (!createdProject) {
      const error = new Error('Something went wrong.')
      error.statusCode = 420
      throw error
    }
    return res.json({ message: 'Project Created!' })
  }).catch(err => next(err))


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

exports.deleteProject = (req, res, next) => {
  const chosenProjectId = req.params.chosenProjectId

  Project.findByPk(chosenProjectId).then(foundProject => {
    if (!foundProject) {
      const error = new Error('Project could not found!')
      error.statusCode = 420
      throw error
    }
    foundProject.destroy()
    return res.json({ message: 'Project deleted successfully.' })
  }).catch(err => next(err))

}

exports.createTaskToProject = async (req, res, next) => {
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