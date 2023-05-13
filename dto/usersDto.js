import {getDao}from '../dao/factoryClasses.js';

const mapUser = (user) => user ?
  ({
    username: user.username,
    password: user.password,
    email: user.email,
    address: user.address,
    age: user.age,
    phoneNumber: user.phoneNumber,
    avatar: user.avatar,
    cart: user.cart,
  }) : null;

const getUsersDto = async() => {
  const  dao =   await getDao();
  const users = await dao.users.getAllUsers({});
  return users.map(user => mapUser(user));
};

const getUserByUsernameDto = async(username) => {
  const  dao =   await getDao();
  const returnedUser = await dao.users.getUserByUsername(username);
  return mapUser(returnedUser);
};


const createUserDto = async (user) => {
      const dao = await getDao();
      const newUser = await dao.users.saveUser({
          ...user,
          createdAt: new Date().toLocaleString(),
        });
      
      return mapUser(newUser);
};

const deleteUserDto = async (id) => {
  const dao = await getDao();
  const deletedUser = await dao.users.deleteUser(id);
  return deletedUser;
};


export  { getUsersDto, createUserDto, deleteUserDto, getUserByUsernameDto };