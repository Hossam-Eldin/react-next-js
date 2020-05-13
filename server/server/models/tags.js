'use strict';
module.exports = (sequelize, DataTypes) => {
  const tags = sequelize.define('tags', {
    name: DataTypes.TEXT,
    lang: DataTypes.TEXT

  }, {});
  tags.associate = function(models) {
    // associations can be defined here
   // tags.hasMany(models.tags_map);

  };
  return tags;
};