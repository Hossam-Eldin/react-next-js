'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PostId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDELETE: 'SET NULL'
      },
      up: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      down: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      happy: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      sad: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      angry: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      omg: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      cool: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      wtf: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      cute: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      eww: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      geeky: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      fail: {
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      love:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      scary:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      confused:{
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    return queryInterface.dropTable('Reactions');
  }
};