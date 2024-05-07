const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const List = sequelize.define('List', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure each list has a unique name
    },
  }, {
    tableName: 'Lists', // Explicit table name
    timestamps: true,   // Adds createdAt and updatedAt
  });

  return List;
};
