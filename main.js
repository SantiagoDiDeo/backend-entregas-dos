import http from 'http';
import cluster from 'cluster';
import logger from './logger/logger.js';
import benchmark from './autocannon/autocannon.js';
import { PORT } from './environments/environment.js';
import app from './config/appConfig.js';
import {initializeWebsockets} from './config/socketConfig.js';

const httpServer = http.createServer(app);
initializeWebsockets(httpServer);

httpServer.on('error', (error) => {
  logger.error('ocurrio un error: ', error);
});

/* cluster | server on */

let mode = 'FORK';

if (process.argv.length > 2) {

  const procArgv = process.argv[2].toUpperCase();
  if (procArgv === 'CLUSTER') {
    mode = 'CLUSTER';
  };
};

if (mode === 'CLUSTER') {
  if (cluster.isPrimary) {
  
    const numCPUs = require('os').cpus().length;
        
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      logger.info(`Process ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    httpServer.listen(PORT, () => {
      logger.info(`Servidor en modo cluster corriendo en el proceso ${process.pid}`);
    });
  }
} else {
  httpServer.listen(PORT, () => {
    const horaActual = new Date().toLocaleTimeString();
    //benchmark();
    console.log(` (${horaActual}) Servidor en modo fork corriendo en el proceso ${process.pid} en puerto ${PORT}`)
    logger.info(`Servidor en modo fork corriendo en el proceso ${process.pid} en puerto ${PORT}`);
  });
};


