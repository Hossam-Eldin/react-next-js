'use strict';
module.exports = (sequelize, DataTypes) => {
  const Landing = sequelize.define('Landing', {
    landing_tag: DataTypes.STRING,
    PostId: DataTypes.INTEGER,
    SectionId: DataTypes.INTEGER
  }, {});
  Landing.associate = function(models) {
    // associations can be defined here
    Landing.belongsTo(models.Posts);
    Landing.belongsTo(models.Sections);
  };
  return Landing;
};