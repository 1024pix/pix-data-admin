import { config as srcConfig } from '../src/config.js';

export const config = {
  development: {
    url: srcConfig.databaseUrlExt,
    dialect: 'postgresql',
  },
  test: {
    url: srcConfig.testDatabaseUrlExt,
    dialect: 'postgresql',
  },
  production: {
    url: srcConfig.databaseUrlExt,
    dialect: 'postgresql',
  },
};

export default config;
