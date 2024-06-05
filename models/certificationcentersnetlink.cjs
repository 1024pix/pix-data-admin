'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CertificationCentersNetLink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CertificationCentersNetLink.init({
    certification_center_id: DataTypes.INTEGER,
    certification_centers_net_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CertificationCentersNetLink',
    tableName: 'data_certification_centers_net_link'
  });
  return CertificationCentersNetLink;
};