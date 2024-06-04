'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CertificationCenter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CertificationCenter.init({
    name: DataTypes.STRING,
    externalId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CertificationCenter',
    tableName: 'certification-centers',
  });
  return CertificationCenter;
};