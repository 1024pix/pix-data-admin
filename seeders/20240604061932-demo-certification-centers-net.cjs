'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('data_certification_centers_net', [
      {
        name: 'Les centres de Pix',
      },
      {
        name: 'Les centres de data',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('data_certification_centers_net', null, {});
  },
};
