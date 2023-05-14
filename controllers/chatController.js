import { getChatsDto, addChatDto } from '../dto/chatsDto.js';

const getChatsController = async() => {
  const allChats = await getChatsDto();
  return allChats;
};


const addChatsController = async ( msg ) => {
  const addChat = await addChatDto( msg );
  return addChat; 
};

export  { getChatsController, addChatsController };