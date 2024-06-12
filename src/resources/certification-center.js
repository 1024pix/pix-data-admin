import { models } from '../sequelize.js';
import { readOnlyOptions } from './utils.js';

export const certificationCenter = {
  resource: models.CertificationCenter,
  options: {
    actions: {
      ...readOnlyOptions,
    },
  },
};
