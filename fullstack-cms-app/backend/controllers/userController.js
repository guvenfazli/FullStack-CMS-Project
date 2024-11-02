const Employee = require('../models/Employee')
const Admin = require('../models/Admin')
const Project = require('../models/Project')
const sequelize = require('../utils/database')
const Task = require('../models/Task')
const { Op } = require('sequelize')

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
        }
      })
      
      return res.json({ employees: foundEmployees })
    }

    allEmployees = await Employee.findAll()

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

exports.filterEmployees = async (req, res, next) => {
  const filterParam = req.query.filter

  try {
    const filteredUsers = await Employee.findAll({ order: [filterParam] })

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
      foundProjects = await Project.findAll({ where: { projectName: { [Op.like]: `%${searchParam}%` } }, include: { nested: true, all: true } })
      return res.json({ projects: foundProjects })
    }

    if (filterParam) {
      foundProjects = await Project.findAll({ order: [filterParam], include: { nested: true, all: true } })
      return res.json({ projects: foundProjects })
    }

    allProjects = await Project.findAll({ include: { nested: true, all: true } })

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

    if (!totalProjects || !projectStatusData) {
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
    const fetchedProject = await Project.findByPk(projectId, { include: { all: true, nested: true } })

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
  foundTask.taskStatus = taskStatus
  foundTask.save()
  return res.json({ message: 'Status changed.' })
}