import { faker } from '@faker-js/faker';
faker.locate = 'es';
import logger from '../logger/logger.js';


class Container {

  constructor( itemsNumber ) {
      this.itemsNumber = itemsNumber;
  };
  
  async newItem() {
    const title = await faker.commerce.product();
    const price = await faker.commerce.price(100, 3000, 0);
    const thumbnail = await faker.image.imageUrl() ;
    return {
      "title": title,
      "price": price,
      "thumbnail": thumbnail 
    };
  };


  async getArray() {
    try{
      const items = [];
      for (let i = 0; i < this.itemsNumber; i++) {
        items.push( await this.newItem () );
      };
      return items;
    } catch(err) {
      logger.error(`Error: ${err}`);
      //console.log(`ERRORRRR ${err}`);
    };
  };

};
  

const mockProducts = new Container( 5 );

export default mockProducts ;