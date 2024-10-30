const Employee = require('../models/Employee')
const Admin = require('../models/Admin')
const Project = require('../models/Project')
const sequelize = require('../utils/database')

exports.fetchUserData = (req, res, next) => {
  Employee.count().then(countedEmployees => {
    return res.json({ totalUsers: countedEmployees })
  })
}

exports.fetchAllUser = (req, res, next) => {
  Employee.findAll().then(allEmployees => {
    return res.json({ employees: allEmployees })
  })
}

exports.filterEmployees = (req, res, next) => {
  const filterParam = req.query.filter
  Employee.findAll({ order: [filterParam] }).then(filteredUsers => {
    return res.json({ employees: filteredUsers })
  })
}

exports.fetchProjects = (req, res, next) => {
  Project.findAll({
    include: { nested: true, all: true }
  }).then(allProjects => {
    return res.json({ projects: allProjects })
  })
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