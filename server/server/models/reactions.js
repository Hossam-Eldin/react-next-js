'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reactions = sequelize.define('Reactions', {
    PostId: DataTypes.INTEGER,
    up: DataTypes.INTEGER,
    down: DataTypes.INTEGER,
    happy: DataTypes.INTEGER,
    sad: DataTypes.INTEGER,
    angry: DataTypes.INTEGER,
    omg: DataTypes.INTEGER,
    cool: DataTypes.INTEGER,
    wtf: DataTypes.INTEGER,
    cute: DataTypes.INTEGER,
    eww: DataTypes.INTEGER,
    geeky: DataTypes.INTEGER,
    fail: DataTypes.INTEGER,
    love: DataTypes.INTEGER,
    scary: DataTypes.INTEGER,
    confused: DataTypes.INTEGER,
  }, {});
  Reactions.associate = function(models) {
    // associations can be defined here
    Reactions.belongsTo(models.Posts);
  };
  return Reactions;
};