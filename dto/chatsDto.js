import {getDao} from '../dao/factoryClasses.js';


const getChatsDto = async() => {
  const dao = await getDao();
  const allChats = await dao.chats.getArray();
  return allChats;
};

const addChatDto = async( message ) => {
  const dao = await getDao();

  const addChat = await dao.chats.add( message );
  return addChat;
};



export  { getChatsDto, addChatDto };