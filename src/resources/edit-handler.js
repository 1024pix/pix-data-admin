import { createValidationError } from '@adminjs/sequelize';
import { flat, paramConverter, populator } from 'adminjs';
import { sequelize } from '../sequelize.js';

const SEQUELIZE_VALIDATION_ERROR = 'SequelizeValidationError';
const SEQUELIZE_UNIQUE_ERROR = 'SequelizeUniqueConstraintError';

// cf: https://github.com/SoftwareBrothers/adminjs-sequelizejs/blob/71a6450384352092f29adfa354fe0a2ef666aea2/src/resource.ts#L183
async function editInTransaction({ params, record, edit }) {
  const parsedParams = record.resource.parseParams(params);
  const unflattedParams = flat.unflatten(parsedParams);
  return sequelize.transaction(async (t) => {
    try {
      const id = record.id();
      await edit({ id, params: unflattedParams, record, t });
      const updatedRecord = await record.resource.findById(id);
      record.storeParams(updatedRecord);
      return record;
    } catch (error) {
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

export async function editHandler(request, response, context, edit) {
  // CF: https://github.com/SoftwareBrothers/adminjs/blob/e27e885e819529b0dd9ba2e5b64e6afade1b59aa/src/backend/actions/edit/edit-action.ts#L32
  const { record, resource, currentAdmin, h } = context;
  if (!record) {
    throw new NotFoundError([
      `Record of given id ("${request.params.recordId}") could not be found`,
    ].join('\n'), 'Action#handler');
  }
  if (request.method === 'get') {
    return { record: record.toJSON(currentAdmin) };
  }

  const params = paramConverter.prepareParams(request.payload ?? {}, resource);
  const newRecord = await editInTransaction({ params, record, edit });
  const [populatedRecord] = await populator([newRecord], context);

  context.record = populatedRecord;

  if (record.isValid()) {
    return {
      redirectUrl: h.resourceUrl({ resourceId: resource._decorated?.id() || resource.id() }),
      notice: {
        message: 'successfullyUpdated',
        type: 'success',
      },
      record: populatedRecord.toJSON(currentAdmin),
    };
  }
  const baseMessage = populatedRecord.baseError?.message
    || 'thereWereValidationErrors';
  return {
    record: populatedRecord.toJSON(currentAdmin),
    notice: {
      message: baseMessage,
      type: 'error',
    },
  };
}
