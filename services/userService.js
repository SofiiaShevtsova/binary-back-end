import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  getAll() {
    const users = userRepository.getAll();
    if (!users) {
      return null;
    }
    return users;
  }

  create(data) {
    const { email, phoneNumber } = data;
    const userExists =
      userRepository.getOne({ email: email }) ||
      userRepository.getOne({ phoneNumber: phoneNumber });
    if (userExists) {
      return null;
    }
    const newUser = userRepository.create(data);
    if (!newUser) {
      return null;
    }
    return newUser;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
