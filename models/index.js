const { Sequelize } = require('sequelize');
const config = require('../config/config.json')['development']; // Or your current environment

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: console.log, // Optional: for debugging
  }
);

// Initialize the db object to hold the models
const db = {};

// Explicitly require and define the models
const User = require('./user')(sequelize, Sequelize.DataTypes);
const List = require('./list')(sequelize, Sequelize.DataTypes);
const Task = require('./task')(sequelize, Sequelize.DataTypes);

// Add the models to the db object
db.List = List;
db.Task = Task;
db.User = User;

// Establish associations
List.associate = (models) => {
  List.hasMany(models.Task, {
    foreignKey: 'listId',
    as: 'tasks',
    onDelete: 'CASCADE', // If a list is deleted, also delete its tasks
  });
};

Task.associate = (models) => {
  Task.belongsTo(models.List, {
    foreignKey: 'listId',
    as: 'list',
  });
};

// Establish associations explicitly
List.associate(db);
Task.associate(db);

// Add the sequelize and Sequelize instances to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
