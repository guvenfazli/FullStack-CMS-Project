const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskStatus: {
    type: DataTypes.STRING,
    defaultValue: 'Active'
  },
  taskDeadline: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
})

module.exports = Task