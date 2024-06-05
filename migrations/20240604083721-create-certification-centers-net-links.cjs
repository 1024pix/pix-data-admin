'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('data_certification_centers_net_links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      certification_center_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'certification-centers',
          },
          key: 'id',
        },
        allowNull: false,
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    }, {
      uniqueKeys: {
        net_link_unique: {
          fields: ['certification_center_id', 'certification_centers_net_id'],
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('data_certification_centers_net_links');
  },
};
