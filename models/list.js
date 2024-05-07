const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const List = sequelize.define('List', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  List.associate = (models) => {
    List.hasMany(models.Task, {
      foreignKey: 'listId',  // Foreign key in Task pointing to List
      as: 'tasks',  // Alias for the relationship
      onDelete: 'CASCADE',  // Deletes related tasks if the list is deleted
    });
  };

  return List;
};
