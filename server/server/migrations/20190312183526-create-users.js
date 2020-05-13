'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: {
        type: Sequelize.STRING
      },
      avatar:{
        type:Sequelize.TEXT
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      last_login: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      googleId: {
        type: Sequelize.TEXT
      },
      facebookId: {
        type: Sequelize.TEXT
      },
      type:{
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};