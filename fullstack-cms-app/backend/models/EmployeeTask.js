const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const EmployeeTask = sequelize.define('employeeTask', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = EmployeeTask