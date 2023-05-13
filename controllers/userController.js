import { getUsersDto, createUserDto, deleteUserDto, getUserByUsernameDto} from '../dto/usersDto.js';
import logger from '../logger/logger.js';

const getAllUsersController = async() => {
  const getUser = await getUsersDto( {} );
  if (getUser.length === 0) {
    return [];
  };
  return getUser;
};

const getUserControllerByUsername = async (username) => {
  const existentUser = await getUserByUsernameDto( username );
  return existentUser;
};


  const createUserController = async (user) => {
    try {
      const existingUser = await getUserControllerByUsername(user.username);
      if (existingUser) {
        throw new Error(`User "${user.username}" already exists`);
      }
      if (user.username && user.password && user.email) {
        const newUser = await createUserDto(user);
        return newUser;
      }
      throw new Error(`Missing data`);
    } catch (err) {
      throw new Error(err);
    }
  };
  

const deleteUserController = async (id) => {
  const deleteUser = await deleteUserDto(id);
  return deleteUser;

};

export  { createUserController, getAllUsersController, deleteUserController, getUserControllerByUsername };
