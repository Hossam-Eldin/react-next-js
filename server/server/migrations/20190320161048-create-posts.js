'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.TEXT
      },
      thumbnail: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT
      },
      summery: {
        type: Sequelize.TEXT
      },
      SectionId: {
        type: Sequelize.INTEGER
      },
      ext_link: {
        type: Sequelize.TEXT
      },
      image_link: {
        type: Sequelize.TEXT
      },
      video_link: {
        type: Sequelize.TEXT
      },
      video_name: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDELETE: 'SET NULL'
      },
      views: {
        type: Sequelize.INTEGER
      },
      keywords:{
        type:Sequelize.TEXT
      },
      commentCount: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      lang: {
        type: Sequelize.STRING
      },
      badge:{
         type: Sequelize.STRING 
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
    return queryInterface.dropTable('Posts');
  }
};