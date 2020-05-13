'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Landings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      landing_tag: {
        type: Sequelize.STRING
      },
      PostId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Posts',
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDELETE:'SET NULL'
      },
      SectionId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Sections',
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDELETE:'SET NULL'
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
    return queryInterface.dropTable('Landings');
  }
};