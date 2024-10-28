const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Project = sequelize.define('project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectStatus: {
    type: DataTypes.STRING,
    defaultValue: 'Active'
  },
  deadLine: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
})

module.exports = Project