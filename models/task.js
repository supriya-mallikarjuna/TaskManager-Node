const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.List, {
      foreignKey: 'listId',
      as: 'list',  // Alias for the relationship
    });
  };

  return Task;
};
