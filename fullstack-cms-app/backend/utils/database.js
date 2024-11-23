const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('fullstack-cms', 'root', process.env.DB_PW, { dialect: 'mysql' })

module.exports = sequelize