'use strict';
module.exports = (sequelize, DataTypes) => {
  const WebInfo = sequelize.define('WebInfo', {
    info_name: DataTypes.STRING,
    tag: DataTypes.STRING,
    info_content: DataTypes.TEXT
  }, {});
  WebInfo.associate = function(models) {
    // associations can be defined here
  };
  return WebInfo;
};