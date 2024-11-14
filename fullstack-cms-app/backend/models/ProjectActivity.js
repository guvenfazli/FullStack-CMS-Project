const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const ProjectActivity = sequelize.define('projectActivity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

module.exports = ProjectActivity