import AdminJSHapi from '@adminjs/hapi';
import * as AdminJSSequelize from '@adminjs/sequelize';
import { AdminJS } from 'adminjs';
import { config } from './config.js';
import { resources } from './resources/index.js';

async function authenticate(email, password) {
  if (email === config.adminjs.email && password === config.adminjs.password) {
    return Promise.resolve({ email, password });
  }
  return null;
}

AdminJS.registerAdapter(AdminJSSequelize);

const adminOptions = {
  rootPath: '/admin',
  resources,
  auth: {
    isSecure: config.environment === 'production',
    cookieName: 'adminjs',
    cookiePassword: config.cookieSecret,
    authenticate,
  },
  registerInert: true,
};

export const plugin = {
  plugin: AdminJSHapi,
  options: adminOptions,
};
