'use strict';
module.exports = (sequelize, DataTypes) => {
  const TagMaps = sequelize.define('TagMaps', {
    tagId: DataTypes.INTEGER,
    SectionId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {});
  TagMaps.associate = function(models) {
    // associations can be defined here
   TagMaps.belongsTo(models.Posts)
    TagMaps.belongsTo(models.tags);
   TagMaps.belongsTo(models.Sections);
  };
  return TagMaps;
};