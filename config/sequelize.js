const { Sequelize } = require('sequelize');

// Environment-based configuration
const config = {
  database: process.env.DB_NAME || 'TaskManager',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false, // Optional: disable logging for cleaner output
});

module.exports = sequelize;


