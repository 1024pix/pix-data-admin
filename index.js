import { createServer } from './server.js';

(async () => {
  try {
    const server = await createServer();
    await server.start();
    console.log('Server running on %s', server.info.uri);
  }
  catch (error) {
    console.error(error);
    throw error;
  }
})();
