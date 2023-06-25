import { userRepository } from "../repositories/userRepository.js";

class UserService {
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAll() {
    const users = userRepository.getAll();
    if (!users) {
      throw new Error("Can't find users!");
    }
    return users;
  }

  getOne(id) {
        const user = this.search({ id: id });
    if (!user) {
      throw new Error("Can't find user!");
    }
    return user;

  }

  create(data) {
    const { email, phoneNumber } = data;
    const userExists =
      this.search({ email: email }) ||
      this.search({ phoneNumber: phoneNumber });
    if (userExists) {
      throw new Error ("This email or phone number exists!");
    }
    const newUser = userRepository.create(data);
    if (!newUser) {
      throw new Error ("Can't create user!");
    }
    return newUser;
  }

  update(id, data) {
    const { email, phoneNumber } = data;
    const userExists =
      this.search({ email: email }) ||
      this.search({ phoneNumber: phoneNumber });

    if (userExists) {
      throw new Error ("This email or phone number exists!");
    }
    const user = this.search({ id: id });
    if (!user) {
      throw new Error ("User not found!");
    }
    const updateUser = userRepository.update(id, data);
    return updateUser;
  }

  delete(id) {
    const userForDelete = this.search({ id: id });
    if (!userForDelete) {
      throw new Error ("Can't find user!");
    }
    const deleteUser = userRepository.delete(id);
    if (!deleteUser) {
      throw new Error ("Can't find user!");
    }
    return deleteUser;
  }
}

const userService = new UserService();

export { userService };
