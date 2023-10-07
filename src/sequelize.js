const { Sequelize } = require('sequelize')
const Config = require('./config');

const sequelize = new Sequelize(Config.dbMySql)

module.exports = sequelize;