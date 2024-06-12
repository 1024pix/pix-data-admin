import { models, modelsExt } from '../sequelize.js';
import { config } from '../config.js';
import { creationHandler } from './creation-handler.js';
import { editHandler } from './edit-handler.js';
import { readOnlyOptions } from './utils.js';

async function create(params, t) {
  const created = await models.CertificationCenterNetLink.create(params, { transaction: t });
  if (config.externalIsActive) {
    await modelsExt.CertificationCenterNetLink.create(params);
  }
  return created.toJSON();
}

async function edit({ id, params, record, t }) {
  await models.CertificationCenterNetLink.update(params, {
    where: {
      [record.resource.primaryKey()]: id,
    },
    individualHooks: true,
    hooks: true,
    transaction: t,
  });
  if (config.externalIsActive) {
    await modelsExt.CertificationCenterNetLink.update(params, {
      where: {
        [record.resource.primaryKey()]: id,
      },
      individualHooks: true,
      hooks: true,
    });
  }
}

export const certificationCenterNetLink = {
  name: 'CertificationCenterNetLink',
  resource: models.CertificationCenterNetLink,
  options: {
    listProperties: ['certification_center_id', 'certification_centers_net_id'],
    editProperties: ['certification_center_id', 'certification_centers_net_id'],
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
