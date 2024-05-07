const { DataTypes } = require('sequelize');
const List = require('./list'); // Reference to the List model

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value for completed status
    },
    listId: {
      type: DataTypes.INTEGER,
      references: {
        model: List, // Reference to the List model
        key: 'id',
      },
      onDelete: 'CASCADE', // Cascade deletion if the list is deleted
    },
  }, {
    tableName: 'Tasks', // Explicit table name
    timestamps: true,
  });

  return Task;
};
