const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const EmployeeProject = sequelize.define('employeeProject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = EmployeeProject