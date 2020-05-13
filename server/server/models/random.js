'use strict';
module.exports = (sequelize, DataTypes) => {
  const Random = sequelize.define('Random', {
    PostId: DataTypes.INTEGER,
    Random_tag: DataTypes.STRING,
    lang: DataTypes.STRING
  }, {});
  Random.associate = function(models) {
    // associations can be defined here
    Random.belongsTo(models.Posts)
  };
  return Random;
};