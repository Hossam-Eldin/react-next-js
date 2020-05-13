'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    subject: DataTypes.TEXT,
    email: DataTypes.TEXT,
    about: DataTypes.TEXT,
    message: DataTypes.TEXT,
    name: DataTypes.STRING
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};