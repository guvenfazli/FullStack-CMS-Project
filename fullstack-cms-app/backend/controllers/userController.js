const Employee = require('../models/Employee')
const Admin = require('../models/Admin')
const Project = require('../models/Project')
const Task = require('../models/Task')
const EmployeeTask = require('../models/EmployeeTask')
const sequelize = require('../utils/database')
const { Op } = require('sequelize')

exports.fetchAllAdmins = async (req, res, next) => {
  try {

    const allAdmins = await Admin.findAll({
      include: [
        { model: Employee, include: [{ model: Task, attributes: ['id'] }], attributes: ['id', 'name', 'surname', 'email', 'jobTitle', 'profilePic', 'createdAt', 'completedTasks', 'isAdmin'] }
      ]
    })

    if (!allAdmins) {
      const error = new Error('Admins could not found!')
      error.statusCode = 444
      throw error
    }

    return res.json({ allAdmins })
  } catch (err) {
    next(err)
  }

}

exports.fetchUserData = async (req, res, next) => {
  try {
    const countedEmployees = await Employee.count()

    if (!countedEmployees) {
      const error = new Error('Something went wrong while filtering!')
      error.statusCode = 444
      throw error
    }

    return res.json({ totalUsers: countedEmployees })

  } catch (err) {
    next(err)
  }
}

exports.fetchAllUser = async (req, res, next) => {

  const searchParam = req.query.employee
  let employeeName = searchParam
  let employeeSurname;
  let foundEmployees
  let allEmployees

  try {

    if (searchParam) {

      if (searchParam.includes(' ')) {
        const fullName = searchParam.split(' ')
        employeeName = fullName[0]
        employeeSurname = fullName[1]
      }

      foundEmployees = await Employee.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${employeeName}%` } },
            { surname: { [Op.like]: `%${employeeSurname}%` } }]
        },
        attributes: ['id', 'profilePic', 'name', 'surname', 'email', 'isAdmin', 'jobTitle']
      })

      return res.json({ employees: foundEmployees })
    }

    allEmployees = await Employee.findAll({ attributes: ['id', 'profilePic', 'name', 'surname', 'email', 'isAdmin', 'completedTasks', 'jobTitle'], include: { model: Task, attributes: ['id', 'taskName', 'taskStatus', 'projectId'] } })

    if (!foundEmployees && !allEmployees) {
      const error = new Error('Employees could not found!')
      error.statusCode = 444
      throw error
    }

    return res.json({ employees: allEmployees })
  } catch (err) {
    next(err)
  }

}

exports.fetchSingleEmployee = async (req, res, next) => {
  const chosenEmployeeId = req.params.chosenEmployeeId

  try {
    const foundEmployee = await Employee.findByPk(chosenEmployeeId, { attributes: ['id', 'profilePic', 'name', 'surname', 'email', 'isAdmin', 'jobTitle', 'birthDate', 'phoneNumber', 'createdAt'], include: { model: Task, attributes: ['id', 'taskName', 'taskStatus', 'projectId', 'taskDeadline'] } })

    if (!foundEmployee) {
      const error = new Error('User not found!')
      error.statusCode = 404
      throw error
    }

    return res.json({ foundEmployee })

  } catch (err) {
    next(err)
  }

}

exports.filterEmployees = async (req, res, next) => {
  const filterParam = req.query.filter

  try {
    const filteredUsers = await Employee.findAll({ order: [filterParam], attributes: ['id', 'profilePic', 'name', 'surname', 'email', 'isAdmin', 'jobTitle'] })

    if (!filteredUsers) {
      const error = new Error('Something went wrong while filtering!')
      error.statusCode = 444
      throw error
    }

    return res.json({ employees: filteredUsers })
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
      foundProjects = await Project.findAll({ where: { projectName: { [Op.like]: `%${searchParam}%` } }, include: [{ model: Task, }] })
      return res.json({ projects: foundProjects })
    }

    if (filterParam) {
      console.log(filterParam)
      foundProjects = await Project.findAll({ order: [filterParam], include: [{ model: Task, }] })
      return res.json({ projects: foundProjects })
    }

    allProjects = await Project.findAll({ include: { model: Task } })

    if (!foundProjects && !allProjects) {
      const error = new Error('Could not fetch projects!')
      error.statusCode = 404
      throw error
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
      const error = new Error('Could not fetch stats!')
      error.statusCode = 424
      throw error
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
              attributes: ['id', 'name', 'surname', 'profilePic']
            }
          ]
        }
      ]
    })

    if (!fetchedProject) {
      const error = new Error('Project not found!')
      error.statusCode = 404
      throw error
    }

    return res.json({ fetchedProject })

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
      await assignedEmployee.save()
    }

    assignedEmployeesList.forEach((completedTask) => {
      completedTask.destroy()
    })

  }


  foundTask.taskStatus = taskStatus
  foundTask.save()
  return res.json({ message: 'Status changed.' })
}