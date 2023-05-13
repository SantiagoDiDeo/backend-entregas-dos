import connectToDb from '../DB/config/connectToDb.js';
import { userModel } from '../DB/model/modelMongo.js';

export  class userMongoDao {
  
    saveUser = async (user) => {
        await connectToDb();
        const newUser = new userModel(user);
        await newUser.save(); 
        return newUser;      
    };

    getAllUsers = async () => {
      await connectToDb();
      const allUsers =  await userModel.find({})
      return allUsers;
    };

    getUserByUsername = async (username) => {
      await connectToDb();
       const user =  await userModel.findOne({ username: username})
       return user;
      };

    deleteUser = async (id) => {
      await connectToDb();
      const deletedUser =  await userModel.deleteOne(id);
      return deletedUser;
    };

    updateUser = async (id, userToUpdate) => {
        return await userModel.updateOne(
            { _id: id },
            { $set: { ...userToUpdate } }
        );
    };
  };