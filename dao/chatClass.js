import connectToDb from '../DB/config/connectToDb.js';
import { chatModel } from '../DB/model/modelMongo.js';
import normalizedData from '../normalizr/normalizr.js';
import logger from '../logger/logger.js';

export class Container {

  constructor( schema ) {
      this.schema = schema;
  };
  

  async getArray() {
    try{
      await connectToDb();
      const messagesInDb = await this.schema.findOne ( { chatid: 'chat1'},
        { projection: { messages: 1, _id: 0 }} );
      logger.info(messagesInDb);
      return normalizedData( messagesInDb );
    } catch(err) {
        logger.error(`Error: ${err}`);
        //console.log(`ERRORRRR ${err}`);
    };
  };
 

  async add( message ) {
    try{
      await connectToDb();
      const messagesInDb = await this.schema.findOne ( { chatid: 'chat1' } ,
      { projection: { messages: 1, _id: 0 }} );
      await this.schema.updateOne( { chatid: 'chat1' } ,
      { $set: { messages: messagesInDb.push( message) }} );
      return
    } catch(err) {
      logger.error(`Error: ${err}`);
      //console.log(`ERRORRRR ${err}`);
    };
  };

};


const Chats = new Container ( chatModel );


export default Chats;