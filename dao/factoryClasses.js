import  {persistence}  from '../environments/environment.js';
import {prodMongoDao} from './prodMongoDao.js';
import {userMongoDao} from './userMongoDao.js';
import Chats from './chatClass.js';
import ChatsMemory from './chatClassMemory.js';
import {ProdMemoryDao} from './prodMemoryDao.js';
import {UserMemoryDao} from './userMemoryDao.js';





export const getDao = async() => {
  let productsDao, usersDao, chatsDao;
  
    if ( persistence === 'MEMORY') {
      productsDao = new ProdMemoryDao();
      usersDao =  new UserMemoryDao();
      chatsDao =  ChatsMemory;

    } else {
      
      productsDao = new prodMongoDao();
      usersDao =  new userMongoDao();
      chatsDao =  Chats;

    };
  
  return  {
    products: productsDao,
    users: usersDao,
    chats: chatsDao
  };
};

