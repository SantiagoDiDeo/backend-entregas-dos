let users = [];

export class UserMemoryDao {

  getAllUsers = async () => {
    return users;
  };

  saveUser = async (user) => {
    const newUser = users.push(user);
    return newUser;
  };

  getUserByUsername = async (username) => {
    const user = users.find((user) => user.username === username);
    return user;
  }

  deleteUser = async (id) => {
    const user = users.find((user) => user.id === id);
    if (user !== -1) {
      users.splice(user, 1);
    }
    return user;
  };

};
