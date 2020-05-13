'use strict';
module.exports = (sequelize, DataTypes) => {
  const quiz = sequelize.define('quiz', {
    quiz_name: DataTypes.STRING
  }, {});
  quiz.associate = function(models) {
    // associations can be defined here
  };
  return quiz;
};