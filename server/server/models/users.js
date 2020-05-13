'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    uid:DataTypes.STRING,
    type:DataTypes.STRING,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    about: DataTypes.TEXT,
    last_login: DataTypes.DATE,
    status: DataTypes.STRING,
    googleId: DataTypes.TEXT,
    facebookId: DataTypes.TEXT,
    avatar:DataTypes.TEXT
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Posts)
  };
  return Users;
};