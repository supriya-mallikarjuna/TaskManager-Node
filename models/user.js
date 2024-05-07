const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,  // Optional field
      allowNull: true,  // Password can be null for social login
    },
    loginType: {
      type: DataTypes.ENUM('social', 'manual'),  // Defines login type
      allowNull: false,
    },
  }, {
    tableName: 'Users', // Ensure explicit table name
    timestamps: true,
  });

  return User;
};
