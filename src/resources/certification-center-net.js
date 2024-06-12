import { models, modelsExt } from '../sequelize.js';
import { config } from '../config.js';
import { creationHandler } from './creation-handler.js';
import {readOnlyOptions} from './utils.js';

async function create(params, t) {
  const created = await models.CertificationCenterNet.create(params, { transaction: t });
  if (config.externalIsActive) {
    await modelsExt.CertificationCenterNet.create(params);
  }
  return created.toJSON();
}

export const certificationCenterNet = {
  resource: models.CertificationCenterNet,
  options: {
    actions: {
      ...readOnlyOptions,
      new: {
        actionType: 'resource',
        icon: 'Plus',
        isAccessible: true,
        handler: async (request, response, context) => {
          return creationHandler(request, response, context, create);
        },
      },
    },

  }
};
