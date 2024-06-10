import { createServer } from './src/server.js';

(async () => {
  try {
    const server = await createServer();
    await server.start();
    // eslint-disable-next-line no-console
    console.log('Server running on %s', server.info.uri);
  }
  catch (error) {
    console.error(error);
    throw error;
  }
})();
