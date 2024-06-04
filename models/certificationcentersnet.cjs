'use strict';
const {
  Model
} = require('sequelize');
const model =  (sequelize, DataTypes) => {
  class CertificationCentersNet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CertificationCentersNet.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CertificationCentersNet',
    tableName: 'data_certification_centers_net'
  });
  return CertificationCentersNet;
};
module.exports = model;