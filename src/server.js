import Hapi from '@hapi/hapi';
import { plugin as adminjsPlugin } from './adminjs.js';
import { config } from './config.js';

export async function createServer() {
  const server = new Hapi.server({
    compression: false,
    port: config.port || 3000,
  });
  await setupRoutesAndPlugins(server);
  return server;
}

async function setupRoutesAndPlugins(server) {
  await server.register(adminjsPlugin);
}
