const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Notification = sequelize.define('notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  assignedBy: {
    type: DataTypes.STRING,
    allowNull: false
  },

  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

})

module.exports = Notification