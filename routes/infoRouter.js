import express from 'express';
import { getAllProductsController } from '../controllers/productController.js';
const {Router} = express;
const infoRouter = Router()
import os from 'os';
const numCPUs = os.cpus().length;

import logger from '../logger/logger.js';
import compression from 'compression';




infoRouter.get('/',  (req, res) => {
    res.render('form', {product: getAllProductsController(), productExist: true});
  });

  infoRouter.get('/info', compression(), (req, res) => {
    const datos = {
      'carpeta de proyecto': process.cwd(),
      'plataforma': process.platform,
      'version de node': process.version,
      'memoria reservada': process.memoryUsage().heapTotal,
      'process id': process.pid,
      'numero de procesadores' : numCPUs,
  
    }
    res.send(JSON.stringify({datos, },null,2))
    
  })

  infoRouter.get('/api/randoms', (req, res) => {
    const cant = req.query.cant || 100000000;
    
      const results = {};
      for (let i = 0; i < cant; i++) {
        const num = Math.floor(Math.random() * 1000) + 1;
        results[num] = (results[num] || 0) + 1;
      }
      
    
   res.json(JSON.stringify(results, null, 2));
    
    logger.info(`Ruta: /api/randoms, metodo: ${req.method}, data: ${JSON.stringify(results)}`)
    
  });

  export default infoRouter;