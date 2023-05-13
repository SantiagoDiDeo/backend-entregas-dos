import { expect, assert } from 'chai';
import { createUserController, deleteUserController, getAllUsersController, getUserControllerByUsername } from '../controllers/userController.js';


describe('User controller MONGODB', () => {
        

        // it('should return array of users', async ()=> {
        //         const result = await getAllUsersController();
        //         expect(result).to.be.an('array');
        // });

        // it('should add a user', async () => {
        //         const user = {
        //                 email: 'test@mail.com ',
        //                 username: 'test',
        //                 password: '123',
        //                 address: 'asad',
        //                 age: 22,
        //                 phoneNumber: '1122334455',
        //                 avatar: 'avatars picture',
        //                 cart: [],
        //         };
        //         const result = await createUserController(user);
        // });

        
        // it('should return user by username', async () => {
        //         const username = 'test';
        //         const result = await getUserControllerByUsername(username);
        //         expect(result.username).to.be.equal(username);
        // });

        // it('should delete user by id', async () => {
        //         const users = await getAllUsersController();
        //         const id = users[0]._id;
                
        //         const usersBeforeDeletion = await getAllUsersController();
                
        //         const result = await deleteUserController(id);
                
        //         const usersAfterDeletion = await getAllUsersController();
                
        //         expect(usersAfterDeletion.length).to.equal(usersBeforeDeletion.length - 1);
        //         });

});

describe('user controller MEMORY', async () => {

        // it('should return an array of users or empty array', async () => {
        // const result = await getAllUsersController();
        // expect(result).to.be.an('array');

        // });

        // it('should add a user', async () => {
        //         const user = {
        //                 email: 'testmemory@mail.com ',
        //                 username: 'testmemory',
        //                 password: '123',
        //                 address: 'audad',
        //                 age: 22,
        //                 phoneNumber: '1122334455',
        //                 avatar: 'avatars picture',
        //                 cart: [],
        //         };
        //         const result = await createUserController(user);
        //         const usersArray = await getAllUsersController();
        //         expect(result).to.be.an('object').that.has.all.keys('email', 'username', 'password', 'address', 'age', 'phoneNumber', 'avatar', 'cart');
        // });

        // it('should return user by username', async () => {
        //         const username = 'testmemory';
        //         const result = await getUserControllerByUsername(username);
        //         expect(result.username).to.be.equal(username);
        // });

        // it('should delete user by id', async () => {
        //         const username = 'testmemory';
        //         const user = await getUserControllerByUsername(username);
        //         const id = user._id;
                
        //         const usersBeforeDeletion = await getAllUsersController();
                
        //         await deleteUserController(id);
                
        //         const usersAfterDeletion = await getAllUsersController();

        //         expect(usersAfterDeletion.length).to.equal(usersBeforeDeletion.length - 1);
        //         });

});