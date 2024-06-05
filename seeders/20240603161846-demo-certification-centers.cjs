'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('certification-centers', [
      {
        name: 'Centre de certification de Pix',
        externalId: 'PIXCENTER',
      },
      {
        name: 'Centre de l\'équipe Data',
        externalId: 'DATACENTER',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('certification-centers', null, {});
  },
};
