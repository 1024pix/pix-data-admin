'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const certificationCenter = await queryInterface.sequelize.query('SELECT id FROM "certification-centers" WHERE name = \'Centre de certification de Pix\'');
    const certificationCentersNet = await queryInterface.sequelize.query('SELECT id FROM data_certification_centers_net WHERE name = \'Les centres de Pix\'');

    await queryInterface.bulkInsert('data_certification_centers_net_links', [{
      certification_center_id: certificationCenter[0][0].id,
      certification_centers_net_id: certificationCentersNet[0][0].id,
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('data_certification_centers_net_links', null, {});
  },
};
