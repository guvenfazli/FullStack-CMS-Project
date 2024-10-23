const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = Admin