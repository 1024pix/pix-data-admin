import { DataTypes, Sequelize } from 'sequelize';
import certificationCenter from '../models/certificationcenter.cjs';
import certificationCenterNet from '../models/certificationcentersnet.cjs';
import certificationCenterNetLink from '../models/certificationcentersnetlink.cjs';
import { config } from './config.js';

const sequelize = new Sequelize(config.databaseUrl);

const models = {
  CertificationCenter: certificationCenter(sequelize, DataTypes),
  CertificationCenterNet: certificationCenterNet(sequelize, DataTypes),
  CertificationCenterNetLink: certificationCenterNetLink(sequelize, DataTypes),
};

// eslint-disable-next-line import/no-mutable-exports
let sequelizeExt;
// eslint-disable-next-line import/no-mutable-exports
let modelsExt;

if (config.externalIsActive) {
  sequelizeExt = new Sequelize(config.databaseUrlExt);

  modelsExt = {
    CertificationCenter: certificationCenter(sequelizeExt, DataTypes),
    CertificationCenterNet: certificationCenterNet(sequelizeExt, DataTypes),
    CertificationCenterNetLink: certificationCenterNetLink(sequelizeExt, DataTypes),
  };
}

export { sequelize, DataTypes, models, sequelizeExt, modelsExt };
