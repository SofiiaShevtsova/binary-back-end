import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    const users = userRepository.getAll();
    if (!users) {
      return null;
    }
    return users;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  create(data) {
    const { email, phoneNumber } = data;
    const userExists =
      this.search({ email: email }) ||
      this.search({ phoneNumber: phoneNumber });
    if (userExists) {
      return null;
    }
    const newUser = userRepository.create(data);
    if (!newUser) {
      return null;
    }
    return newUser;
  }

  update(id, data) {
    const { email, phoneNumber } = data;
    const userExists =
      this.search({ email: email }) ||
      this.search({ phoneNumber: phoneNumber });
    if (userExists) {
      return null;
    }
    const updateUser = userRepository.update(id, data);
    if (!updateUser) {
      return null;
    }
    return updateUser;
  }

  delete(id) {
    const deleteUser = userRepository.delete(id);
    if (!deleteUser) {
      return null;
    }
    return deleteUser;
  }
}

const userService = new UserService();

export { userService };
