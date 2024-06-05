import 'dotenv/config.js';
import { env } from 'node:process';
import Joi from 'joi';

const requiredEnvVars = Joi.object({
  PORT: Joi.number().default(3000),
  COOKIE_SECRET: Joi.string().min(32).required(),
  ADMINJS_EMAIL: Joi.string().required(),
  ADMINJS_PASSWORD: Joi.string().required(),
  DATABASE_URL: Joi.string().uri().required(),
  TEST_DATABASE_URL: Joi.string().uri().optional(),
});

function validateEnvVars() {
  const { error } = requiredEnvVars.validate(env, { allowUnknown: true });
  if (error) {
    throw new Error(`Environment variable validation error: ${error.message}`);
  }
}

validateEnvVars();

export const config = {
  environment: env.NODE_ENV,
  port: env.PORT,
  cookieSecret: env.COOKIE_SECRET,
  adminjs: {
    email: env.ADMINJS_EMAIL,
    password: env.ADMINJS_PASSWORD,
  },
  databaseUrl: env.DATABASE_URL,
  testDatabaseUrl: env.TEST_DATABASE_URL,
};
