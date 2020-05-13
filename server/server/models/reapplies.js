'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reapplies = sequelize.define('Reapplies', {
    CommentId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    upvote: DataTypes.INTEGER,
    downvote: DataTypes.INTEGER
  }, {});
  Reapplies.associate = function(models) {
    // associations can be defined here
    Reapplies.belongsTo(models.Comments);
    Reapplies.belongsTo(models.Users);
  };
  return Reapplies;
};