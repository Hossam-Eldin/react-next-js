'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    PostId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    upVote: DataTypes.INTEGER,
    downVote: DataTypes.INTEGER
  }, {});
  Comments.associate = function(models) {
    // associations can be defined here
    Comments.belongsTo(models.Posts);
    Comments.belongsTo(models.Users);
    Comments.hasMany(models.Reapplies);
  };
  return Comments;
};