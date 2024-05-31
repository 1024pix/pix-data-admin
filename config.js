import 'dotenv/config.js';
import { env } from 'node:process';

export const config = {
  environment: env.NODE_ENV,
  port: env.PORT,
  cookieSecret: env.COOKIE_SECRET,
  adminjs: {
    email: env.ADMINJS_EMAIL,
    password: env.ADMINJS_PASSWORD,
  },
};
