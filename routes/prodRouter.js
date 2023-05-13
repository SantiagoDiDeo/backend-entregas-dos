import express from  'express';
import {addProductController, getAllProductsController, getProductByIdController, deleteProductByIdController } from '../controllers/productController.js';
import { faker } from '@faker-js/faker';
const { Router } = express;
import passport from 'passport';
import '../DB/config/auth.js';
const prodRouter = Router();
import { fork } from 'child_process';
import logger from '../logger/logger.js';

prodRouter.use(passport.initialize());
prodRouter.use(passport.session());


//get all products
prodRouter.get('/', async ( req, res ) => {
    const allProducts = await getAllProductsController();
    res.render('products', {product: allProducts, productExist: true});

});

//get products by id
prodRouter.get('/:id', async ( req, res ) => {
    const id = req.params.id;
    const product = await getProductByIdController(id);
    product ? res.json( product )
    : res.status(404).send({ error: 'producto no encontrado'})  ;

});

//post product
prodRouter.post('/productos', async (req, res) => {
    const productToAdd = await req.body;
    await addProductController(productToAdd);
    res.send({ message: 'producto agregado', product: productToAdd});

  });

//update product
prodRouter.put('/:id', async ( req, res ) => {
    const id = req.params.id;
    const  replace  = req.body;

    if(await addProductController( id )){
        res.send({ message: 'producto modificado', product: replace});
      } else {
        res.status(404).send({ error: 'producto no encontrado'});
      };
    
});

//delete product
prodRouter.delete('/:id', async ( req, res ) => {
    const { id } = req.params;

    if (await deleteProductByIdController(id)) {
        res.send({ message: 'producto borrado'});
      } else {
        res.status(404).send({ error: 'producto no encontrado'});
      };
});

prodRouter.get('/productos-test', (req, res) => {
  const products = mockProducts.getArray();
  logger.info(products);
  res.json(products);
});

/* apirandoms */

prodRouter.get('/api/randoms', (req, res) => {
  const cant = req.query.cant || 100000000;
  const child = fork('./randoms.js');
  child.send(cant);
  child.on('message', (data) => {
    res.json(data);
  });
});


export default prodRouter;