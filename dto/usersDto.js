import getDao from '../class/factoryClasses.js';


const getUserDto = async( username, password) => {
  const users =   await getDao().users;
  console.log('usersdto:', users)
  const getUser = await users.getUser( username, password);
  return getUser;
};

const createUserDto = async( obj ) => {
  const users =   await getDao().users;
  const newUser = await users.createUser( obj );
  return newUser;
};



export  { getUserDto, createUserDto };