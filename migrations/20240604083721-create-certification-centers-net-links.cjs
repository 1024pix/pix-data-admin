'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('data_certification_centers_net_links', {
      certification_center_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'certification-centers',
          },
          key: 'id',
        },
        allowNull: false,
        primaryKey: true,
        isId: true,
      },
      certification_centers_net_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'data_certification_centers_net',
          },
          key: 'id',
        },
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('data_certification_centers_net_links');
  },
};
