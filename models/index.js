const fs = require('fs');
const path = require('path');
const sequelize = require('../config/sequelize'); // Sequelize instance
const db = {};

// Explicitly import and initialize models
const UserModel = require('./user'); 
const ListModel = require('./list');
const TaskModel = require('./task');
// Import the model

const User = UserModel(sequelize);
const List = ListModel(sequelize); // Correct initialization
const Task = TaskModel(sequelize);

Task.belongsTo(List, { foreignKey: 'listId', onDelete: 'CASCADE' });
List.hasMany(Task, { foreignKey: 'listId' }); // Reverse association
// Add models to the db object
db.User = User;
db.List = List;
db.Task = Task;

db.sequelize = sequelize;

module.exports = db;

