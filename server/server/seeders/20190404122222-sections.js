'use strict';
const Dummy = require('dummyjs');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      let sections  = [];
      for (let i = 0; i < 20; i++) {
        sections.push({
            name: Dummy.text(1),
            description: Dummy.text(),
            icon:'icon.png',
            createdAt: new Date(),
            updatedAt: new Date(),
        }) 
      }
      return queryInterface.bulkInsert('Sections',sections)

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return  queryInterface.bulkDelete('Sections', null,{});
  }
};
