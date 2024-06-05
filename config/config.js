import { config as srcConfig } from '../src/config.js';

export const config = {
  development: {
    url: srcConfig.databaseUrl,
    dialect: 'postgresql',
  },
  test: {
    url: srcConfig.testDatabaseUrl,
    dialect: 'postgresql',
  },
  production: {
    url: srcConfig.databaseUrl,
    dialect: 'postgresql',
  },
};

export default config;
