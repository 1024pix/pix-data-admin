import AdminJSHapi from '@adminjs/hapi';
import { config } from './config.js';

async function authenticate(email, password) {
  if (email === config.adminjs.email && password === config.adminjs.password) {
    return Promise.resolve({ email, password });
  }
  return null;
}

const adminOptions = {
  resources: [],
  rootPath: '/admin',
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
