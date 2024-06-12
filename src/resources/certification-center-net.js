import { models, modelsExt } from '../sequelize.js';
import { config } from '../config.js';
import { creationHandler } from '../handlers/creation-handler.js';
import { readOnlyOptions } from './utils.js';
import { editHandler } from '../handlers/edit-handler.js';

async function create(params, t) {
  const created = await models.CertificationCenterNet.create(params, { transaction: t });
  if (config.externalIsActive) {
    await modelsExt.CertificationCenterNet.create(params);
  }
  return created.toJSON();
}

async function edit({ id, params, record, t }) {
  await models.CertificationCenterNet.update(params, {
    where: {
      [record.resource.primaryKey()]: id,
    },
    individualHooks: true,
    hooks: true,
    transaction: t,
  });
  if (config.externalIsActive) {
    await modelsExt.CertificationCenterNet.update(params, {
      where: {
        [record.resource.primaryKey()]: id,
      },
      individualHooks: true,
      hooks: true,
    });
  }
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
      edit: {
        actionType: 'record',
        icon: 'Edit',
        isAccessible: true,
        handler: async (request, response, context) => {
          return editHandler(request, response, context, edit);
        },
      },
    },
  },
};
