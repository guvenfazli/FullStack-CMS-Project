const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('fullstack-cms', 'root', 'guven0071973', { dialect: 'mysql' })

module.exports = sequelize