import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import   {mongoUrl}  from '../../environments/environment.js';
import logger from '../../logger/logger.js';
import mongoose from 'mongoose';

const app = express();
let isConnected;

const connectMongo = async () => {
  try {
      await mongoose.connect(mongoUrl, {
          dbName: "Cluster0", // ACA PONE EL NOMBRE DE TU BASE DE DATOS
          user: "santiagodideo", // PONE UN USUARIO ROOT PARA TRABAJAR DE MONGO ATLAS
          pass: "santiago", // OBVIAMENTE EL PASSWORD
      });
      console.log("MongoDB connected successfully");
      logger.info("MongoDB connected successfully");
  } catch (error) {
      logger.error({ error });
  }
};

const connectToDb = async () => {
  if(!isConnected) {
    await connectMongo();

    await app.use(session({
      store: new MongoStore({
        mongoUrl: mongoUrl}),
        secret: 'secreto1',
        cookie: {maxAge: 60000},  
        resave: true,
        collection: 'test',
        saveUninitialized: true,
        serverSelectionTimeoutMS: 30000,
        
      }));
    
          isConnected = true;
          logger.info('MongoAtlasDB Connected successfully');
    return;
  } else {
    
    logger.info("Connection with DB already exists");
    return;
  };
};


export default connectToDb; 