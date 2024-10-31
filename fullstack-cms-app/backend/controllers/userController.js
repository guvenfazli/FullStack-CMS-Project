const Employee = require('../models/Employee')
const Admin = require('../models/Admin')
const Project = require('../models/Project')
const sequelize = require('../utils/database')
const Task = require('../models/Task')
const { Op } = require('sequelize')

exports.fetchUserData = async (req, res, next) => {

  const countedEmployees = await Employee.count()
  return res.json({ totalUsers: countedEmployees })

}

exports.fetchAllUser = async (req, res, next) => {

  const searchParam = req.query.employee

  if (searchParam) {
    const foundEmployees = await Employee.findAll({ where: { [Op.or]: [{ name: { [Op.like]: `%${searchParam}%` } }, { surname: { [Op.like]: `%${searchParam}%` } }] } })
    return res.json({ employees: foundEmployees })
  }

  const allEmployees = await Employee.findAll()
  return res.json({ employees: allEmployees })


}

exports.filterEmployees = async (req, res, next) => {
  const filterParam = req.query.filter

  const filteredUsers = await Employee.findAll({ order: [filterParam] })
  return res.json({ employees: filteredUsers })

}

exports.fetchProjects = async (req, res, next) => {

  const searchParam = req.query.project

  if (searchParam) {
    const foundProjects = await Project.findAll({ where: { projectName: { [Op.like]: `%${searchParam}%` } }, include: { nested: true, all: true } })
    return res.json({ projects: foundProjects })
  }

  const allProjects = await Project.findAll({ include: { nested: true, all: true } })
  return res.json({ projects: allProjects })



}

exports.fetchProjectStats = async (req, res, next) => {
  const totalProjects = await Project.count()
  const projectStatusData = await Project.findAll({ attributes: ['projectStatus', [sequelize.fn('COUNT', sequelize.col('projectStatus')), 'counted']], group: ['projectStatus'] })

  return res.json({ totalProjects, projectStatusData })
}

exports.fetchSingleProject = async (req, res, next) => {
  const projectId = req.params.projectId
  const fetchedProject = await Project.findByPk(projectId, { include: { all: true, nested: true } })
  return res.json({ fetchedProject })

}

exports.changeTaskStatus = async (req, res, next) => {
  const { taskStatus } = req.body
  const taskId = req.params.taskId
  const foundTask = await Task.findByPk(taskId)
  foundTask.taskStatus = taskStatus
  foundTask.save()
  return res.json({ message: 'Status changed.' })
}