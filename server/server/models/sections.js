'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sections = sequelize.define('Sections', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    icon: DataTypes.TEXT,
    lang:DataTypes.STRING
  }, {});
  Sections.associate = function(models) {
    // associations can be defined here
  Sections.hasMany(models.Posts);
   Sections.hasMany(models.TagMaps)
   Sections.hasMany(models.Landing);
  };
  return Sections;
};