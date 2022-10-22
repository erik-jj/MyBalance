const { Sequelize } = require('sequelize');
const { config } = require('../config/config.js');

const setupModels = require('../db/models/index.js');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: true,
});

sequelize.sync({ alter: true });
setupModels(sequelize);

module.exports = sequelize;
