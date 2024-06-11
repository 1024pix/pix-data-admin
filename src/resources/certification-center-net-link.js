import { paramConverter, populator } from 'adminjs';
import { createValidationError } from '@adminjs/sequelize';
import {models, modelsExt, sequelize} from '../sequelize.js';
import { config } from '../config.js';

const SEQUELIZE_VALIDATION_ERROR = 'SequelizeValidationError';
const SEQUELIZE_UNIQUE_ERROR = 'SequelizeUniqueConstraintError';

async function createInTwoDatabases(record, params) {
  return sequelize.transaction(async (t) => {
    // cf: https://github.com/SoftwareBrothers/adminjs-sequelizejs/blob/71a6450384352092f29adfa354fe0a2ef666aea2/src/resource.ts#L166
    try {
      const savedCertificationCenterNetLink = await models.CertificationCenterNetLink.create(params, { transaction: t });
      if (config.externalIsActive) {
        await modelsExt.CertificationCenterNetLink.create(params);
      }
      record.storeParams(savedCertificationCenterNetLink.toJSON());
      return record;
    }
    catch (error) {
      if (error.name === SEQUELIZE_VALIDATION_ERROR) {
        throw createValidationError(error);
      }
      if (error.name === SEQUELIZE_UNIQUE_ERROR) {
        throw createValidationError(error);
      }
      throw error;
    }
  });
}

export const certificationCenterNetLink = {
  name: 'CertificationCenterNetLink',
  resource: models.CertificationCenterNetLink,
  options: {
    listProperties: ['certification_center_id', 'certification_centers_net_id'],
    editProperties: ['certification_center_id', 'certification_centers_net_id'],
    actions: {
      new: {
        actionType: 'resource',
        icon: 'Plus',
        isAccessible: true,
        handler: async (request, response, context) => {
          // CF: https://github.com/SoftwareBrothers/adminjs/blob/e27e885e819529b0dd9ba2e5b64e6afade1b59aa/src/backend/actions/new/new-action.ts#L30
          const { resource, h, currentAdmin } = context;
          if (request.method === 'post') {
            const params = paramConverter.prepareParams(request.payload ?? {}, resource);

            let record = await resource.build(params);

            record = await createInTwoDatabases(record, params);

            const [populatedRecord] = await populator([record], context);

            context.record = populatedRecord;

            if (record.isValid()) {
              return {
                redirectUrl: h.resourceUrl({ resourceId: resource._decorated?.id() || resource.id() }),
                notice: {
                  message: 'successfullyCreated',
                  type: 'success',
                },
                record: record.toJSON(currentAdmin),
              };
            }
            const baseMessage = populatedRecord.baseError?.message
              || 'thereWereValidationErrors';
            return {
              record: record.toJSON(currentAdmin),
              notice: {
                message: baseMessage,
                type: 'error',
              },
            };
          }
          throw new Error('new action can be invoked only via `post` http method');
        },
      },
    },
  },
};