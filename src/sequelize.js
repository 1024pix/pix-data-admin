import { DataTypes, Sequelize } from 'sequelize';
import certificationCenter from '../models/certificationcenter.cjs';
import certificationCenterNetLink from '../models/certificationcentersnetlink.cjs';
import { config } from './config.js';

const sequelize = new Sequelize(config.databaseUrl);

const models = {
  CertificationCenter: certificationCenter(sequelize, DataTypes),
  CertificationCenterNetLink: certificationCenterNetLink(sequelize, DataTypes),
};

export { sequelize, DataTypes, models };
